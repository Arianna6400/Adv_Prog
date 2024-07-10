import Transito from '../models/transito';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';
import { Transaction } from 'sequelize';

interface TransitoDAO extends DAO<TransitoAttributes, number> {
    getAllByVeicolo(targa: string): Promise<Transito[]>;
}

class TransitoDao implements TransitoDAO {

    public async getAll(): Promise<Transito[]> {
        try {
            return await Transito.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei transiti:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti');
        }
    }

    public async getById(id: number): Promise<Transito | null> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            return transito;
        } catch (error) {
            console.error(`Errore nel recupero del transito con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del transito con id ${id}`);
        }
    }

    public async create(data: TransitoCreationAttributes, options?: { transaction?: Transaction }): Promise<Transito> {
        try {
            return await Transito.create(data);
        } catch (error) {
            console.error('Errore nella creazione del transito:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del transito');
        }
    }

    public async update(id: number, data: Partial<TransitoAttributes>, options?: { transaction?: Transaction }): Promise<[number, Transito[]]> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            const [affectedCount] = await Transito.update(data, { where: { id_transito: id }, returning: true });
            const updatedItems = await Transito.findAll({ where: { id_transito: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del transito con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del transito con id ${id}`);
        }
    }

    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            return await Transito.destroy({ where: { id_transito: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del transito con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del transito con id ${id}`);
        }
    }

    public async getAllByVeicolo(targa: string): Promise<Transito[]> {
        try {
            return await Transito.findAll({ where: { veicolo: targa } });
        } catch (error) {
            console.error(`Errore nel recupero dei transiti per il veicolo con targa ${targa}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dei transiti per il veicolo con targa ${targa}`);
        }
    }
}

export default new TransitoDao();