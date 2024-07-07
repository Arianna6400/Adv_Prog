import orarioChiusuraDao from '../dao/orarioChiusuraDao';
import OrarioChiusura from '../models/orarioChiusura';
import { OrarioChiusuraCreationAttributes, OrarioChiusuraAttributes } from '../models/orarioChiusura';

class OrarioChiusuraRepository {
    public async getAllOrariChiusura(): Promise<OrarioChiusura[]> {
        try {
            return await orarioChiusuraDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero degli orari di chiusura dal repository:', error);
            throw new Error('Impossibile recuperare gli orari di chiusura');
        }
    }

    public async getOrarioChiusuraById(id: number): Promise<OrarioChiusura | null> {
        try {
            return await orarioChiusuraDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero dell\'orario di chiusura con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare l\'orario di chiusura');
        }
    }

    public async createOrarioChiusura(data: OrarioChiusuraCreationAttributes): Promise<OrarioChiusura> {
        try {
            return await orarioChiusuraDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione dell\'orario di chiusura nel repository:', error);
            throw new Error('Impossibile creare l\'orario di chiusura');
        }
    }

    public async updateOrarioChiusura(id: number, data: Partial<OrarioChiusuraAttributes>): Promise<[number, OrarioChiusura[]]> {
        try {
            return await orarioChiusuraDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell\'aggiornamento dell\'orario di chiusura con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare l\'orario di chiusura');
        }
    }

    public async deleteOrarioChiusura(id: number): Promise<number> {
        try {
            return await orarioChiusuraDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione dell\'orario di chiusura con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare l\'orario di chiusura');
        }
    }
}

export default new OrarioChiusuraRepository();
