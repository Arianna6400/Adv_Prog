import Utente from '../models/utente';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { UtenteAttributes, UtenteCreationAttributes } from '../models/utente';
import { Transaction, FindOptions } from 'sequelize';

interface UtenteDAO<T, K> {
    getById(id: K): Promise<T | null>;
    checkTokenByEmail(email: string): Promise<number>;
    rechargeTokens(email: string, tokens: number): Promise<Utente>;
    getByEmail(email: string, options?: FindOptions): Promise<Utente | null>;
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

    public async getByEmail(email: string, options?: FindOptions): Promise<Utente | null> {
        try {
            const utente = await Utente.findOne({ where: { email }, ...options });
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${email} non trovato`);
            }
            return utente;
        } catch (error) {
            console.error(`Errore nel recupero dell'utente con email ${email}:`, error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'utente con email ${email}`);
        }
    }
    
    // metodo per controllare i token rimanenti
    public async checkTokenByEmail(email: string): Promise<number> {
        try {
            const utente = await Utente.findOne({ where: { email }, attributes: ['token_rimanenti'] });
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${email} non trovato`);
            }
            return utente.token_rimanenti;
        } catch (error) {
            console.error(`Errore nel controllo dei token per l'utente con email ${email}:`, error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel controllo dei token per l'utente con email ${email}`);
        }
    }

    // metodo per ricaricare i token di un utente dato l'email
    public async rechargeTokens(email: string, tokens: number): Promise<Utente> {
        try {
            const utente = await Utente.findOne({ where: { email } });
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Utente con email ${email} non trovato`);
            }
            utente.token_rimanenti += tokens;
            await utente.save();
            return utente;
        } catch (error) {
            console.error(`Errore nell'aggiornamento dei token per l'utente con email ${email}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dei token per l'utente con email ${email}`);
        }
    }
}

export default new UtenteDao();