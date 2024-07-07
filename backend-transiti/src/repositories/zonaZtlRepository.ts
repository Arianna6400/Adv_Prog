import zonaZtlDao from '../dao/zonaZtlDao';
import ZonaZtl from '../models/zonaZtl';
import { ZonaZtlCreationAttributes, ZonaZtlAttributes } from '../models/zonaZtl';

class ZonaZtlRepository {
    public async getAllZonaZtl(): Promise<ZonaZtl[]> {
        try {
            return await zonaZtlDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero delle zone ZTL dal repository:', error);
            throw new Error('Impossibile recuperare le zone ZTL');
        }
    }

    public async getZonaZtlById(id: number): Promise<ZonaZtl | null> {
        try {
            return await zonaZtlDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero della zona ZTL con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare la zona ZTL');
        }
    }

    public async createZonaZtl(data: ZonaZtlCreationAttributes): Promise<ZonaZtl> {
        try {
            return await zonaZtlDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione della zona ZTL nel repository:', error);
            throw new Error('Impossibile creare la zona ZTL');
        }
    }

    public async updateZonaZtl(id: number, data: Partial<ZonaZtlAttributes>): Promise<[number, ZonaZtl[]]> {
        try {
            return await zonaZtlDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento della zona ZTL con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare la zona ZTL');
        }
    }

    public async deleteZonaZtl(id: number): Promise<number> {
        try {
            return await zonaZtlDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione della zona ZTL con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare la zona ZTL');
        }
    }
}

export default new ZonaZtlRepository();
