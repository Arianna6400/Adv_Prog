import Multa from '../models/multa';
import { HttpError } from '../middleware/errorHandler';
import { DAO } from './daoInterface';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';

interface MultaDAO extends DAO<MultaAttributes, number> {
    // Metodi specifici per Multa, se necessari
}

class MultaDao implements MultaDAO {
    public async getAll(): Promise<Multa[]> {
        try {
            return await Multa.findAll();
        } catch (error) {
            console.error('Errore nel recupero delle multe:', error);
            throw new HttpError(500, 'Errore nel recupero delle multe');
        }
    }

    public async getById(id: number): Promise<Multa | null> {
        try {
            return await Multa.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero della multa con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero della multa con id ${id}`);
        }
    }

    public async create(data: MultaCreationAttributes): Promise<Multa> {
        try {
            return await Multa.create(data);
        } catch (error) {
            console.error('Errore nella creazione della multa:', error);
            throw new HttpError(500, 'Errore nella creazione della multa');
        }
    }

    public async update(id: number, data: Partial<MultaAttributes>): Promise<[number, Multa[]]> {
        try {
            const [affectedCount] = await Multa.update(data, { where: { id_multa: id }, returning: true });
            const updatedItems = await Multa.findAll({ where: { id_multa: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento della multa con id ${id}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento della multa con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await Multa.destroy({ where: { id_multa: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione della multa con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione della multa con id ${id}`);
        }
    }
}

export default new MultaDao();
