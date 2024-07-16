import multaDao from '../dao/multaDao';
import transitoDao from '../dao/transitoDao';
import veicoloDao from '../dao/veicoloDao';
import Multa from '../models/multa';
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
/**
 * Classe MultaRepository per gestire le operazioni CRUD sulle multe e altre operazioni specifiche.
 */
class MultaRepository {
    /**
     * Recupera tutte le multe di un utente.
     * 
     * @param {number} utenteId L'ID dell'utente.
     * @returns {Promise<any[]>} Una Promise che risolve un array di più Promise combinate dell'utente.
     */
    public async getMulteByUtente(utenteId: number): Promise<any[]> {
        try {
            // Recupera e filtra i veicoli dell'utente
            const veicoliUtente = await this._getVeicoliByUtente(utenteId);
            // Recupera e filtra  i transiti per i veicoli dell'utente
            const transitiUtente = await this._getTransitiByVeicoli(veicoliUtente);
            // Ottieni le multe per i transiti dell'utente
            const multeUtente = await this._getMulteByTransiti(transitiUtente);

            const results = await Promise.all(multeUtente.map(async (multa) => {
                const transito = await transitoDao.getById(multa.transito);
                return {
                    ...multa.dataValues,
                    transito: transito ? transito.dataValues : null
                };
            }));
            return results;
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
    public async getMultaWithDetailsByUUID(uuid: string, utenteId: number): Promise<{ multa: Multa, transito: Transito, veicolo: Veicolo } | null> {
        try {

            // Recupera la multa dal DAO tramite il suo UUID
            const multa = await multaDao.getMultaByUUID(uuid);
            if (!multa) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Multa con uuid ${uuid} non trovata`);
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

    // HELPER PRIVATI

    /**
     * Metodo privato per ottenere i veicoli di un utente.
     * 
     * @param {number} utenteId L'ID dell'utente.
     * @returns {Promise<Veicolo[]>} Una Promise che risolve con un array di veicoli dell'utente.
     */
    private async _getVeicoliByUtente(utenteId: number): Promise<Veicolo[]> {
        const veicoli = await veicoloDao.getAll();
        return veicoli.filter(veicolo => veicolo.utente === utenteId);
    }

    /**
     * Metodo privato per ottenere i transiti associati a un array di veicoli.
     * 
     * @param {Veicolo[]} veicoliUtente Un array di veicoli dell'utente.
     * @returns {Promise<Transito[]>} Una Promise che risolve con un array di transiti dei veicoli dell'utente.
     */
    private async _getTransitiByVeicoli(veicoliUtente: Veicolo[]): Promise<Transito[]> {
        const transiti = await transitoDao.getAll();
        return transiti.filter(transito => veicoliUtente.some(veicolo => veicolo.targa === transito.veicolo));
    }

    /**
     * Metodo privato per ottenere le multe associate a un array di transiti.
     * 
     * @param {Transito[]} transitiUtente Un array di transiti dei veicoli dell'utente.
     * @returns {Promise<Multa[]>} Una Promise che risolve con un array di multe dei transiti dell'utente.
     */
    private async _getMulteByTransiti(transitiUtente: Transito[]): Promise<Multa[]> {
        const multe = await multaDao.getAll();
        return multe.filter(multa => transitiUtente.some(transito => transito.id_transito === multa.transito));
    }
}

export default new MultaRepository();