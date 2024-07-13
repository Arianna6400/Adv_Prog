import Utente from '../models/utente';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { UtenteAttributes } from '../models/utente';
import { FindOptions } from 'sequelize';

// Interfaccia per il DAO degli utenti
interface UtenteDAO<T, K> {
    getById(id: K): Promise<T | null>;
    checkToken(id: number): Promise<number>;
    rechargeTokens(id: number, tokens: number): Promise<Utente>;
}

// Classe UtenteDao che implementa l'interfaccia UtenteDAO
class UtenteDao implements UtenteDAO<UtenteAttributes, number> {

    /**
     * Metodo per ottenere un utente tramite ID
     * 
     * @param {number} id L'ID dell'utente.
     * @param {FindOptions} [options] Opzioni aggiuntive per la query di ricerca.
     * @returns {Promise<Utente | null>} Una Promise che risolve l'utente trovato o null se non trovato.
     */
    public async getById(id: number, options?: FindOptions): Promise<Utente | null> {
        try {
            const utente = await Utente.findByPk(id);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
            }
            return utente;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'utente con id ${id}`);
        }
    }

    /**
     * Metodo per controllare il numero di token rimanenti di un utente dato l'ID.
     * 
     * @param {number} id L'ID dell'utente.
     * @returns {Promise<number>} Una Promise che risolve il numero di token rimanenti.
     */
    public async checkToken(id: number): Promise<number> {
        try {
            const utente = await this.getById(id);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${id} non trovato`);
            }
            return Number(utente.token_rimanenti);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel controllo dei token per l'utente con email ${id}`);
        }
    }

    /**
     * Metodo per ricaricare i token di un utente dato l'ID.
     * 
     * @param {number} id L'ID dell'utente.
     * @param {number} tokens Numero di token da ricaricare.
     * @returns {Promise<Utente>} Una Promise che risolve l'utente aggiornato con i nuovi token.
     */
    public async rechargeTokens(id: number, tokens: number): Promise<Utente> {
        try {
            const utente = await this.getById(id);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
            }
            const newToken = Number(utente.token_rimanenti) + tokens;

            utente.token_rimanenti = newToken
            await utente.save();
            return utente;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dei token per l'utente con email ${id}`);
        }
    }
}

export default new UtenteDao();