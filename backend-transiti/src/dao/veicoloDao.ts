import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { VeicoloAttributes, VeicoloCreationAttributes } from '../models/veicolo';
import { Transaction } from 'sequelize';

interface VeicoloDAO extends DAO<VeicoloAttributes, string> {
    // Metodi specifici per Veicolo, se necessari
}

class VeicoloDao implements VeicoloDAO {
    
    public async getAll(): Promise<Veicolo[]> {
        try {
            return await Veicolo.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei veicoli:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli');
        }
    }

    public async getById(targa: string): Promise<Veicolo | null> {
        try {
            const veicolo = await Veicolo.findByPk(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            return veicolo;
        } catch (error) {
            console.error(`Errore nel recupero del veicolo con targa ${targa}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del veicolo con targa ${targa}`);
        }
    }

    public async getEsenti(): Promise<Veicolo[]> {
        try {
            return await Veicolo.findAll({ where: { esente: true } });
        } catch (error) {
            console.error('Errore nel recupero dei veicoli esenti dal DAO:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli esenti');
        }
    }

    public async create(data: VeicoloCreationAttributes, options?: { transaction?: Transaction }): Promise<Veicolo> {
        try {
            return await Veicolo.create(data);
        } catch (error) {
            console.error('Errore nella creazione del veicolo:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del veicolo');
        }
    }

    public async update(targa: string, data: Partial<VeicoloAttributes>, options?: { transaction?: Transaction }): Promise<[number, Veicolo[]]> {
        try {
            const veicolo = await this.getById(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            const [affectedCount] = await Veicolo.update(data, { where: { targa }, returning: true });
            const updatedItems = await Veicolo.findAll({ where: {targa: targa}});
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del veicolo con targa ${targa}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del veicolo con targa ${targa}`);
        }
    }

    public async delete(targa: string, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const veicolo = await Veicolo.findByPk(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            return await Veicolo.destroy({ where: { targa } });
        } catch (error) {
            console.error(`Errore nella cancellazione del veicolo con targa ${targa}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del veicolo con targa ${targa}`);
        }
    }
}

export default new VeicoloDao();