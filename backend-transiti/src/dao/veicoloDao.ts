import Veicolo from '../models/veicolo';
import { HttpError } from '../middleware/errorHandlerMiddleware';
import { DAO } from './daoInterface';
import { VeicoloAttributes, VeicoloCreationAttributes } from '../models/veicolo';

interface VeicoloDAO extends DAO<VeicoloAttributes, string> {
    // Metodi specifici per Veicolo, se necessari
    getAllByTarga(targa: string): Promise<Veicolo[]>;
}

class VeicoloDao implements VeicoloDAO {
    public async getAll(): Promise<Veicolo[]> {
        try {
            return await Veicolo.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei veicoli:', error);
            throw new HttpError(500, 'Errore nel recupero dei veicoli');
        }
    }

    public async getById(targa: string): Promise<Veicolo | null> {
        try {
            return await Veicolo.findByPk(targa);
        } catch (error) {
            console.error(`Errore nel recupero del veicolo con targa ${targa}:`, error);
            throw new HttpError(500, `Errore nel recupero del veicolo con targa ${targa}`);
        }
    }

    public async create(data: VeicoloCreationAttributes): Promise<Veicolo> {
        try {
            return await Veicolo.create(data);
        } catch (error) {
            console.error('Errore nella creazione del veicolo:', error);
            throw new HttpError(500, 'Errore nella creazione del veicolo');
        }
    }

    public async update(targa: string, data: Partial<VeicoloAttributes>): Promise<[number, Veicolo[]]> {
        try {
            const [affectedCount] = await Veicolo.update(data, { where: { targa }, returning: true });
            const updatedItems = await this.getAllByTarga(targa);
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del veicolo con targa ${targa}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento del veicolo con targa ${targa}`);
        }
    }

    public async delete(targa: string): Promise<number> {
        try {
            return await Veicolo.destroy({ where: { targa } });
        } catch (error) {
            console.error(`Errore nella cancellazione del veicolo con targa ${targa}:`, error);
            throw new HttpError(500, `Errore nella cancellazione del veicolo con targa ${targa}`);
        }
    }

    public async getAllByTarga(targa: string): Promise<Veicolo[]> {
        try {
            return await Veicolo.findAll({ where: { targa } });
        } catch (error) {
            console.error(`Errore nel recupero dei veicoli con targa ${targa}:`, error);
            throw new HttpError(500, `Errore nel recupero dei veicoli con targa ${targa}`);
        }
    }
}

export default new VeicoloDao();
