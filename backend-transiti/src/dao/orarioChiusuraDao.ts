import OrarioChiusura from '../models/orarioChiusura';
import { HttpError } from '../middleware/errorHandler';
import { DAO } from './daoInterface';
import { OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes } from '../models/orarioChiusura';

interface OrarioChiusuraDAO extends DAO<OrarioChiusuraAttributes, number> {
    // Metodi specifici per OrarioChiusura, se necessari
}

class OrarioChiusuraDao implements OrarioChiusuraDAO {
    public async getAll(): Promise<OrarioChiusura[]> {
        try {
            return await OrarioChiusura.findAll();
        } catch (error) {
            console.error('Errore nel recupero degli orari di chiusura:', error);
            throw new HttpError(500, 'Errore nel recupero degli orari di chiusura');
        }
    }

    public async getById(id: number): Promise<OrarioChiusura | null> {
        try {
            return await OrarioChiusura.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero dell\'orario di chiusura con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero dell\'orario di chiusura con id ${id}`);
        }
    }

    public async create(data: OrarioChiusuraCreationAttributes): Promise<OrarioChiusura> {
        try {
            return await OrarioChiusura.create(data);
        } catch (error) {
            console.error('Errore nella creazione dell\'orario di chiusura:', error);
            throw new HttpError(500, 'Errore nella creazione dell\'orario di chiusura');
        }
    }

    public async update(id: number, data: Partial<OrarioChiusuraAttributes>): Promise<[number, OrarioChiusura[]]> {
        try {
            const [affectedCount] = await OrarioChiusura.update(data, { where: { id_orario: id }, returning: true });
            const updatedItems = await OrarioChiusura.findAll({ where: { id_orario: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell\'aggiornamento dell\'orario di chiusura con id ${id}:`, error);
            throw new HttpError(500, `Errore nell\'aggiornamento dell\'orario di chiusura con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await OrarioChiusura.destroy({ where: { id_orario: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione dell\'orario di chiusura con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione dell\'orario di chiusura con id ${id}`);
        }
    }
}

export default new OrarioChiusuraDao();
