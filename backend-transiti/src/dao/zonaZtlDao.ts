import ZonaZtl from '../models/zonaZtl';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
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
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle zone ZTL');
        }
    }

    public async getById(id: number): Promise<ZonaZtl | null> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            return zonaZtl;
        } catch (error) {
            console.error(`Errore nel recupero della zona ZTL con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della zona ZTL con id ${id}`);
        }
    }

    public async create(data: ZonaZtlCreationAttributes): Promise<ZonaZtl> {
        try {
            return await ZonaZtl.create(data);
        } catch (error) {
            console.error('Errore nella creazione della zona ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della zona ZTL');
        }
    }

    public async update(id: number, data: Partial<ZonaZtlAttributes>): Promise<[number, ZonaZtl[]]> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            const [affectedCount] = await ZonaZtl.update(data, { where: { id_zona: id }, returning: true });
            const updatedItems = await ZonaZtl.findAll({ where: { id_zona: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento della zona ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento della zona ZTL con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            return await ZonaZtl.destroy({ where: { id_zona: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione della zona ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della zona ZTL con id ${id}`);
        }
    }
}

export default new ZonaZtlDao();