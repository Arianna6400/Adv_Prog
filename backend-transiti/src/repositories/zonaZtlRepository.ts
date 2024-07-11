import zonaZtlDao from '../dao/zonaZtlDao';
import ZonaZtl from '../models/zonaZtl';
import varcoZtlDao from '../dao/varcoZtlDao';
import { ZonaZtlCreationAttributes, ZonaZtlAttributes } from '../models/zonaZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

class ZonaZtlRepository {
    
    public async getAllZonaZtl(): Promise<ZonaZtl[]> {
        try {
            return await zonaZtlDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero delle zone ZTL dal repository:', error);
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile recuperare le zone ZTL');
        }
    }

    public async getZonaZtlById(id: number): Promise<ZonaZtl | null> {
        try {
            return await zonaZtlDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero della zona ZTL con id ${id} dal repository:`, error);
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile recuperare la zona ZTL con id');
        }
    }

    public async createZonaZtl(data: ZonaZtlCreationAttributes): Promise<ZonaZtl> {
        try {
            return await zonaZtlDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione della zona ZTL nel repository:', error);
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile creare la zona ZTL');
        }
    }

    public async updateZonaZtl(id: number, data: Partial<ZonaZtlAttributes>): Promise<[number, ZonaZtl[]]> {
        try {
            return await zonaZtlDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento della zona ZTL con id ${id} nel repository:`, error);
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile aggiornare la zona ZTL');
        }
    }

    public async deleteZonaZtl(id: number): Promise<number> {
        try {
            // Verifica se ci sono riferimenti a questa zona ZTL nei varchi ZTL
            const zoneReferenced = await varcoZtlDao.countByZonaZtl(id);
            if (zoneReferenced > 0) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Non è possibile eliminare una zona ZTL che ha varchi associati');
            }
            // Esegui l'operazione di eliminazione
            return await zonaZtlDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione della zona ZTL con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare la zona ZTL');
        }
    }
}

export default new ZonaZtlRepository();
