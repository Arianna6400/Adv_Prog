import zonaZtlDao from '../dao/zonaZtlDao';
import ZonaZtl from '../models/zonaZtl';
import varcoZtlDao from '../dao/varcoZtlDao';
import orarioChiusuraDao from '../dao/orarioChiusuraDao';
import { ZonaZtlCreationAttributes, ZonaZtlAttributes } from '../models/zonaZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import transitoDao from '../dao/transitoDao';
import veicoloDao from '../dao/veicoloDao';

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
            // Arricchisce le info di stampa della zona con metodo privato
            return await Promise.all(zoneZtl.map(zona => this._getZonaWithDetails(zona)));
        } catch (error) {
            throw (error);
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
            // Verifica l'esistenza della zona con l'ID
            const zona = await zonaZtlDao.getById(id);
            if (!zona) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile recuperare la zona ZTL con id ${id}`);
            }
            // Arricchisce le info di stampa della zona con metodo privato
            return await this._getZonaWithDetails(zona);
        } catch (error) {
            throw (error);
        }
    }

    /**
     * Recupera una zona ZTL per ID con tutti i transiti associati.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @returns {Promise<any | null>} Una Promise che risolve la zona ZTL con i transiti associati o null se non trovato.
     */
    public async getZonaZtlWithTransiti(id: number): Promise<any | null> {
        try {
            // Verifica l'esistenza della zona con l'ID
            const zonaZtl = await zonaZtlDao.getById(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, `Impossibile recuperare la zona ZTL con id ${id}`);
            }
            // Arricchisce le info di stampa della zona con i transiti in essa
            const varchiNellaZona = await this._getVarchiByZona(zonaZtl.id_zona);
            const transitiWithDetails = await Promise.all(varchiNellaZona.map(async (varco) => {
                const transiti = await this._getTransitiByVarco(varco.id_varco);
                return {
                    varco: varco.dataValues,
                    transiti
                };
            }));

            return {
                ...zonaZtl.dataValues,
                varchi: transitiWithDetails
            };
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare la zona ZTL con id ${id}`);
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
            throw (error);
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
            throw (error);
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
            const zoneReferenced = (await varcoZtlDao.getAll()).find(varco => varco.zona_ztl === id);
            if (zoneReferenced) {
                throw ErrorFactory.createError(ErrorTypes.BadRequest, 'Non è possibile eliminare una zona ZTL che ha varchi associati');
            }
            // Esegui l'operazione di eliminazione
            return await zonaZtlDao.delete(id);
        } catch (error) {
            throw (error);
        }
    }

    // HELPER PRIVATI

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {ZonaZtl} zona La zona ZTL per cui ottenere i dettagli.
     * @returns {Promise<any>} Una Promise che risolve con i dettagli completi della zona ZTL.
     */
    private async _getZonaWithDetails(zona: ZonaZtl): Promise<any> {
        try{
            const varchiZona = await this._getVarchiByZona(zona.id_zona);
            return {
                ...zona.dataValues,
                varchi: varchiZona
            };
        } catch(error){
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero delle informazioni relative alla zona.');
        }   
    }

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {number} zonaId L'ID della zona ZTL. 
     * @returns {Promise<any[]>} Una Promise che risolve con un array di varchi e i loro dettagli.
     */
    private async _getVarchiByZona(zonaId: number): Promise<any[]> {
        try{
            const varchi = await varcoZtlDao.getAll();
            return await Promise.all(varchi
                .filter(varco => varco.zona_ztl === zonaId)
                .map(async (varco) => {
                    const orarioChiusura = await orarioChiusuraDao.getById(varco.orario_chiusura);
                    return {
                        ...varco.dataValues,
                        orario_chiusura: orarioChiusura ? orarioChiusura.dataValues : null
                    };
                }));
        } catch(error){
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero delle informazioni relative ai varchi in una zona.');
        }
    }

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {number} varcoId L'ID del varco ZTL. 
     * @returns {Promise<any[]>} Una Promise che risolve con un array di transiti e i loro dettagli.
     */
    private async _getTransitiByVarco(varcoId: number): Promise<any[]> {
        try {
            const transiti = await transitoDao.getAll();
            return await Promise.all(transiti
                .filter(transito => transito.varco === varcoId)
                .map(async (transito) => {
                    const veicolo = await veicoloDao.getById(transito.veicolo);
                    return {
                        ...transito.dataValues,
                        veicolo: veicolo ? veicolo.dataValues : null,
                        id_transito: undefined,
                        varco: undefined
                    };
                }));
        } catch(error){
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore durante il recupero delle informazioni relative ai transiti in una zona.');
        }    
    }
}

export default new ZonaZtlRepository();