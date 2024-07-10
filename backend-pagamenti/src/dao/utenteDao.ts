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

    public async getById(id: number, options?: FindOptions): Promise<Utente | null> {
        try {
            const utente = await Utente.findByPk(id, options);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con id ${id} non trovato`);
            }
            return utente;
        } catch (error) {
            console.error(`Errore nel recupero dell'utente con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'utente con id ${id}`);
        }
    }

    // metodo per controllare i token rimanenti
    public async checkToken(id: number): Promise<number> {
        try {
            const utente = await this.getById(id);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${id} non trovato`);
            }
            return Number(utente.token_rimanenti);
        } catch (error) {
            console.error(`Errore nel controllo dei token per l'utente con email ${id}:`, error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel controllo dei token per l'utente con email ${id}`);
        }
    }

    // metodo per ricaricare i token di un utente dato l'email
    public async rechargeTokens(id: number, tokens: number): Promise<Utente> {
        try {
            const utente = await this.getById(id);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${id} non trovato`);
            }
            console.log('token precedenti ---------------------->', utente.token_rimanenti);
            const newToken = parseFloat(utente.token_rimanenti.toString()) as number + tokens;
            console.log('token aggiunti ---------------------->', tokens);
            utente.token_rimanenti = newToken
            await utente.save();
            return utente;
        } catch (error) {
            console.error(`Errore nell'aggiornamento dei token per l'utente con email ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dei token per l'utente con email ${id}`);
        }
    }
}

export default new UtenteDao();