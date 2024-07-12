import Utente from '../models/utente';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { UtenteAttributes, UtenteCreationAttributes } from '../models/utente';
import { Transaction, FindOptions } from 'sequelize';

interface UtenteDAO<T, K> {
    getById(id: K): Promise<T | null>;
    checkToken(id: number): Promise<number>;
    rechargeTokens(id: number, tokens: number): Promise<Utente>;
}

class UtenteDao implements UtenteDAO<UtenteAttributes, number> {

    /**
     * Metodo per ottenere un utente tramite ID
     * @param options permette di specificare parametri per le query, fornita da sequelize, esempio transazione
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
     * Metodo per controllare i token rimanenti di un utente
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
     * Metodo per ricaricare i token di un utente dato l'ID
     * @param id identificativ dell'utente al quale effettuare la ricarica
     * @param tokens valore dei token da ricaricare per un utente
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