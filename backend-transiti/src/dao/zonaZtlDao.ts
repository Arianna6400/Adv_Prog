import ZonaZtl from '../models/zonaZtl';
import { HttpError } from '../middleware/errorHandlerMiddleware';
import { DAO } from './daoInterface';
import { ZonaZtlAttributes, ZonaZtlCreationAttributes } from '../models/zonaZtl';

interface ZonaZtlDAO extends DAO<ZonaZtlAttributes, number> {
    // Metodi specifici per ZonaZtl, se necessari
}

class ZonaZtlDao implements ZonaZtlDAO {
    public async getAll(): Promise<ZonaZtl[]> {
        try {
            return await ZonaZtl.findAll();
        } catch (error) {
            console.error('Errore nel recupero delle zone ZTL:', error);
            throw new HttpError(500, 'Errore nel recupero delle zone ZTL');
        }
    }

    public async getById(id: number): Promise<ZonaZtl | null> {
        try {
            return await ZonaZtl.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero della zona ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero della zona ZTL con id ${id}`);
        }
    }

    public async create(data: ZonaZtlCreationAttributes): Promise<ZonaZtl> {
        try {
            return await ZonaZtl.create(data);
        } catch (error) {
            console.error('Errore nella creazione della zona ZTL:', error);
            throw new HttpError(500, 'Errore nella creazione della zona ZTL');
        }
    }

    public async update(id: number, data: Partial<ZonaZtlAttributes>): Promise<[number, ZonaZtl[]]> {
        try {
            const [affectedCount] = await ZonaZtl.update(data, { where: { id_zona: id }, returning: true });
            const updatedItems = await ZonaZtl.findAll({ where: { id_zona: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento della zona ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento della zona ZTL con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await ZonaZtl.destroy({ where: { id_zona: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione della zona ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione della zona ZTL con id ${id}`);
        }
    }
}

export default new ZonaZtlDao();
