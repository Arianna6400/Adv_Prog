import { Request, Response, NextFunction } from 'express';
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import axios from 'axios';
/**
 * Funzione per gestire la richiesta di pagamento della multa
 */
export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.body; // UUID multa passato nel body

    // Se l'UUID non è fornito, ritorna un errore di richiesta errata
    if (!uuid) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'UUID non fornito'));
    }

    try {
        // Estrae il token di autorizzazione dall'intestazione della richiesta 
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        // Imposta il token di autenticazione per le richieste successive
        setAuthToken(token);

        // Richiesta POST all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.post('/pagamulta', { uuid });
        res.status(200).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios, ritornando un errore appropriato
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nel pagamento';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel pagamento'));
    }
};

/**
 * Funzione per gestire la richiesta di ricarica dei token 
 */
export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { tokens } = req.body;

    // Se l'ID o i token non sono forniti, ritorna un errore di richiesta errata
    if (!id || !tokens) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID o tokens non forniti'));
    }

    try {
        // Estrae il token di autorizzazione dall'intestazione della richiesta
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        // Imposta il token di autenticazione per le richieste successive
        setAuthToken(token);

        // Richiesta POST all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.post(`/ricaricatoken/${id}`, { tokens });
        res.status(200).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios, ritornando un errore appropriato
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nella ricarica';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella ricarica'));
    }
};

/**
 * Funzione per gestire la richiesta di verifica dei token residui
 */
export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Estrae il token di autorizzazione dall'intestazione della richiesta
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        // Imposta il token di autenticazione per le richieste successive
        setAuthToken(token);

        // Richiesta GET all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.get('/tokenresidui');
        res.status(200).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios e ritorna un errore appropriato
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nel recupero dei token';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei token'));
    }
};