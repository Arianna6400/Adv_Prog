import { Request, Response, NextFunction } from 'express';
import transitoRepository from '../repositories/transitoRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
import IsVarco from '../models/isVarco';
import isVarcoDao from '../dao/isVarcoDao';

/**
 * Funzione per gestire le richieste relative ai transiti.
 */
export const handleTransitoRequests = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id ? parseInt(req.params.id) : null;

    try {
        if (id) {
            // Recupera il transito dal repository usando l'ID
            const transito = await transitoRepository.getTransitoById(id);
            if (transito) {
                return res.status(StatusCodes.OK).json(transito);
            } else {
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
            }
        } else {
            // Recupera tutti i transiti dal repository
            const transiti = await transitoRepository.getAllTransiti();
            return res.status(StatusCodes.OK).json(transiti);
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per creare un nuovo transito.
 */
export const createTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user; // Estrae l'utente dal payload JWT
        const { ruolo, id } = user;
        
        // Se l'utente è un varco, imposta l'attributo varco nel corpo della richiesta
        if (ruolo === 'varco') {
            const varcoLog = await isVarcoDao.getById(id)
            req.body.varco = varcoLog?.id_varco;
        }

        // Crea un nuovo transito con i dati forniti nel corpo della richiesta
        const nuovoTransito = await transitoRepository.createTransito(req.body);
        res.status(StatusCodes.CREATED).json(nuovoTransito);
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per aggiornare un transito esistente.
 */
export const updateTransito = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Aggiorna il transito esistente con i dati forniti nel corpo della richiesta
        const [updated] = await transitoRepository.updateTransito(id, req.body);
        if (updated) {
            const updatedTransito = await transitoRepository.getTransitoById(id);
            res.status(StatusCodes.OK).json(updatedTransito);
        } else {
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per cancellare un transito per ID.
 */
export const deleteTransito = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Cancella il transito esistente usando l'ID fornito
        const deleted = await transitoRepository.deleteTransito(id);
        if (deleted) {
            res.status(StatusCodes.OK).json({ message: `Transito ${id} eliminato con successo` });
        } else {
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        return next(error);
    }
};