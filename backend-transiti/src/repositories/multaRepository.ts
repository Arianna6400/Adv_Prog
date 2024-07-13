import multaDao from '../dao/multaDao';
import transitoDao from '../dao/transitoDao';
import veicoloDao from '../dao/veicoloDao';
import Multa from '../models/multa';
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import { MultaCreationAttributes, MultaAttributes } from '../models/multa';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
/**
 * Classe MultaRepository per gestire le operazioni CRUD sulle multe e altre operazioni specifiche.
 */
class MultaRepository {
    /**
     * Recupera tutte le multe.
     * 
     * @returns {Promise<Multa[]>} Una Promise che risolve un array di multe.
     */
    public async getAllMulte(): Promise<Multa[]> {
        try {
            return await multaDao.getAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare le multe');
        }
    }

    /**
     * Recupera una multa per ID.
     * 
     * @param {number} id L'ID della multa.
     * @returns {Promise<Multa | null>} Una Promise che risolve una multa o null se non trovata.
     */
    public async getMultaById(id: number): Promise<Multa | null> {
        try {
            return await multaDao.getById(id);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare la multa con id ${id}`);
        }
    }

    /**
    * Crea una nuova multa.
    * 
    * @param {MultaCreationAttributes} data I dati per creare la multa.
    * @returns {Promise<Multa>} Una Promise che risolve la multa creata.
    */
    public async createMulta(data: MultaCreationAttributes): Promise<Multa> {
        try {
            return await multaDao.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile creare una nuova multa');
        }
    }

    /**
     * Aggiorna una multa esistente.
     * 
     * @param {number} id L'ID della multa.
     * @param {Partial<MultaAttributes>} data I dati per aggiornare la multa.
     * @returns {Promise<[number, Multa[]]>} Una Promise che risolve il numero di righe aggiornate e l'array delle multe aggiornate.
     */
    public async updateMulta(id: number, data: Partial<MultaAttributes>): Promise<[number, Multa[]]> {
        try {
            return await multaDao.update(id, data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile aggiornare la multa con id ${id}`);
        }
    }

    /**
     * Cancella una multa per ID.
     * 
     * @param {number} id L'ID della multa.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async deleteMulta(id: number): Promise<number> {
        try {
            return await multaDao.delete(id);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile cancellare la multa con id ${id}`);
        }
    }

    /**
     * Recupera tutte le multe di un utente.
     * 
     * @param {number} utenteId L'ID dell'utente.
     * @returns {Promise<Multa[]>} Una Promise che risolve un array di multe dell'utente.
     */
    public async getMulteByUtente(utenteId: number): Promise<Multa[]> {
        try {
            // Recupera e filtra i veicoli dell'utente
            const veicoliUtente = (await veicoloDao.getAll()).filter(veicolo => veicolo.utente === utenteId);

            // Recupera e filtra  i transiti per i veicoli dell'utente
            const transitiUtente = (await transitoDao.getAll()).filter(transito => veicoliUtente.some(veicolo => veicolo.targa === transito.veicolo));

            // Ottieni le multe per i transiti dell'utente
            const multeUtente = (await multaDao.getAll()).filter(multa => transitiUtente.some(transito => transito.id_transito === multa.transito))
            return multeUtente;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare le multe per l'utente ${utenteId}`);
        }
    }

    /**
     * Recupera una multa con i dettagli per ID e utente.
     * 
     * @param {number} uuid UUID della multa.
     * @param {number} utenteId L'ID dell'utente.
     * @returns {Promise<{ multa: Multa, transito: Transito, veicolo: Veicolo } | null>} Una Promise che risolve un oggetto con i dettagli della multa, transito e veicolo, 
     * o null se non trovato o non autorizzato.
     */
    public async getMultaWithDetailsById(uuid: string, utenteId: number): Promise<{ multa: Multa, transito: Transito, veicolo: Veicolo } | null> {
        try {

            // Recupera la multa dal DAO tramite il suo UUID
            const multa = await multaDao.getMultaByUUID(uuid);
            if (!multa) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare la multa con uuid ${uuid}`);
            }
            
            // Recupera il transito associato alla multa
            const transito = await transitoDao.getById(multa.transito);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Transito non trovato`);
            }

            // Recupera il veicolo associato alla multa
            const veicolo = await veicoloDao.getById(transito.veicolo);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Veicolo non trovato`);
            }

            // Verifica se l'utente è autorizzato a vedere questa multa
            if (veicolo.utente !== utenteId) {
                return null; // L'utente non è autorizzato a vedere questa multa
            }

            return { multa, transito, veicolo };
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare la multa con id ${uuid} per l'utente ${utenteId}`);
        }
    }
}

export default new MultaRepository();