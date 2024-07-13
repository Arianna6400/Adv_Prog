import zonaZtlDao from '../dao/zonaZtlDao';
import ZonaZtl from '../models/zonaZtl';
import varcoZtlDao from '../dao/varcoZtlDao';
import orarioChiusuraDao from '../dao/orarioChiusuraDao';
import { ZonaZtlCreationAttributes, ZonaZtlAttributes } from '../models/zonaZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Definizione della classe ZonaZtlRepository
class ZonaZtlRepository {
    /**
     * Metodo per ottenere tutte le zone ZTL, inclusi i varchi e i loro orari di chiusura.
     * 
     * @returns {Promise<any[]>} Una Promise che risolve con un array di Promise combinate.
     */
    public async getAllZonaZtl(): Promise<any[]> {
        try {
            const zoneZtl = await zonaZtlDao.getAll();
            const results = await Promise.all(zoneZtl.map(async (zona) => {
                const varchi = await varcoZtlDao.getAll();
                const varchiZona = await Promise.all(varchi
                    .filter(varco => varco.zona_ztl === zona.id_zona)
                    .map(async (varco) => {
                        const orarioChiusura = await orarioChiusuraDao.getById(varco.orario_chiusura);
                        return {
                            ...varco.dataValues,
                            orario_chiusura: orarioChiusura
                        };
                    }));
                return {
                    ...zona.dataValues,
                    varchi: varchiZona
                };
            }));
            return results;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile recuperare le zone ZTL');
        }
    }

    /**
     * Metodo per ottenere una zona ZTL per ID, inclusi i varchi e i loro orari di chiusura.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @returns {Promise<any | null>} Una Promise che risolve con un array di Promise o null se non trovata.
     */
    public async getZonaZtlById(id: number): Promise<any | null> {
        try {
            const zona = await zonaZtlDao.getById(id);
            if (!zona) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile recuperare la zona ZTL con id ${id}`);
            }
            const varchi = await varcoZtlDao.getAll();
            const varchiZona = await Promise.all(varchi
                .filter(varco => varco.zona_ztl === zona.id_zona)
                .map(async (varco) => {
                    const orarioChiusura = await orarioChiusuraDao.getById(varco.orario_chiusura);
                    return {
                        ...varco.dataValues,
                        orario_chiusura: orarioChiusura
                    };
                }));
            return {
                ...zona.dataValues,
                varchi: varchiZona
            };
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile recuperare la zona ZTL con id ${id}`);
        }
    }

    /**
     * Metodo per creare una nuova zona ZTL.
     * 
     * @param {ZonaZtlCreationAttributes} data I dati per creare la nuova zona ZTL.
     * @returns {Promise<ZonaZtl>} Una Promise che risolve con la zona ZTL creata.
     */
    public async createZonaZtl(data: ZonaZtlCreationAttributes): Promise<ZonaZtl> {
        try {
            return await zonaZtlDao.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Impossibile creare la zona ZTL');
        }
    }

    /**
     * Metodo per aggiornare una zona ZTL esistente.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @param {Partial<ZonaZtlAttributes>} data I dati aggiornati per la zona ZTL.
     * @returns {Promise<[number, ZonaZtl[]]>} Una Promise che risolve con il numero di righe aggiornate e l'array delle zone ZTL aggiornate.
     */
    public async updateZonaZtl(id: number, data: Partial<ZonaZtlAttributes>): Promise<[number, ZonaZtl[]]> {
        try {
            return await zonaZtlDao.update(id, data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile aggiornare la zona ZTL con id ${id}`);
        }
    }

    /**
     * Metodo per cancellare una zona ZTL per ID.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @returns {Promise<number>} Una Promise che risolve con il numero di righe cancellate.
     */
    public async deleteZonaZtl(id: number): Promise<number> {
        try {
            // Verifica se ci sono riferimenti a questa zona ZTL nei varchi ZTL
            const zoneReferenced = await varcoZtlDao.getById(id);
            if (zoneReferenced) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Non è possibile eliminare una zona ZTL che ha varchi associati');
            }
            // Esegui l'operazione di eliminazione
            return await zonaZtlDao.delete(id);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile cancellare la zona ZTL con id ${id}`);
        }
    }
}

export default new ZonaZtlRepository();