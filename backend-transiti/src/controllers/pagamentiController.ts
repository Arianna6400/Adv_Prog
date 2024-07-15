import { Request, Response, NextFunction } from 'express';
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
/**
 * Funzione per gestire la richiesta di pagamento della multa
 */
export const payMulta = async (req: Request, res: Response, next: NextFunction) => {

    const { uuid } = req.body; // UUID multa passato nel body

    try {
        // Estrae il token di autorizzazione dall'intestazione della richiesta 
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }else{
             // Imposta il token di autenticazione per le richieste successive
            setAuthToken(token);
        }
        // Richiesta POST all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.post('/pagamulta', { uuid });
        res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios, ritornando un errore appropriato
        if (axios.isAxiosError(error)) {
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, error.response?.data?.error.message)); // ritorno il messaggio della funzione chiamata
        }
        return next(error);
    }
};

/**
 * Funzione per gestire la richiesta di ricarica dei token 
 */
export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { tokens } = req.body;

    try {
        // Estrae il token di autorizzazione dall'intestazione della richiesta
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }else{
            // Imposta il token di autenticazione per le richieste successive
            setAuthToken(token);
        }
        // Richiesta POST all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.post(`/ricaricatoken/${id}`, { tokens });
        res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios, ritornando un errore appropriato
        if (axios.isAxiosError(error)) {
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, error.response?.data?.error.message)); // ritorno il messaggio della funzione chiamata
        }
        return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella ricarica'));
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
        }else{
            // Imposta il token di autenticazione per le richieste successive
            setAuthToken(token);
        }

        // Richiesta GET all'endpoint tramite istanza axios per la connessione con backend-pagamenti
        const response = await axiosInstance.get('/tokenresidui');
        res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
        // Gestisce gli errori di axios e ritorna un errore appropriato
        if (axios.isAxiosError(error)) {
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, error.response?.data?.error.message)); // ritorno il messaggio della funzione chiamata
        }
        return next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei token'));
    }
};