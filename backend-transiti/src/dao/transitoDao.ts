import Transito from '../models/transito';
import { HttpError } from '../middleware/errorHandler';
import { DAO } from './daoInterface';
import { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';

interface TransitoDAO extends DAO<TransitoAttributes, number> {
    getAllByVeicolo(targa: string): Promise<Transito[]>;
}

class TransitoDao implements TransitoDAO {
    public async getAll(): Promise<Transito[]> {
        try {
            return await Transito.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei transiti:', error);
            throw new HttpError(500, 'Errore nel recupero dei transiti');
        }
    }

    public async getById(id: number): Promise<Transito | null> {
        try {
            return await Transito.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero del transito con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero del transito con id ${id}`);
        }
    }

    public async create(data: TransitoCreationAttributes): Promise<Transito> {
        try {
            return await Transito.create(data);
        } catch (error) {
            console.error('Errore nella creazione del transito:', error);
            throw new HttpError(500, 'Errore nella creazione del transito');
        }
    }

    public async update(id: number, data: Partial<TransitoAttributes>): Promise<[number, Transito[]]> {
        try {
            const [affectedCount] = await Transito.update(data, { where: { id_transito: id }, returning: true });
            const updatedItems = await Transito.findAll({ where: { id_transito: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del transito con id ${id}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento del transito con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await Transito.destroy({ where: { id_transito: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del transito con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione del transito con id ${id}`);
        }
    }

    public async getAllByVeicolo(targa: string): Promise<Transito[]> {
        try {
            return await Transito.findAll({ where: { veicolo: targa } });
        } catch (error) {
            console.error(`Errore nel recupero dei transiti per il veicolo con targa ${targa}:`, error);
            throw new HttpError(500, `Errore nel recupero dei transiti per il veicolo con targa ${targa}`);
        }
    }
}

export default new TransitoDao();
