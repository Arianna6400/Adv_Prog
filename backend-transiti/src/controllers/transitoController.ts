import { Request, Response, NextFunction } from 'express';
import transitoRepository from '../repositories/transitoRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
/**
 * Funzione per ottenere tutti i transiti.
 */
export const getAllTransiti = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Recupera tutti i transiti dal repository
        const transiti = await transitoRepository.getAllTransiti();
        res.status(StatusCodes.OK).json(transiti);
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per ottenere un transito per ID.
 */
export const getTransitoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Recupera il transito dal repository usando l'ID
        const transito = await transitoRepository.getTransitoById(id);
        if (transito) {
            res.status(StatusCodes.OK).json(transito);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per creare un nuovo trannsito.
 */
export const createTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Crea un nuovo transito con i dati forniti nel corpo della richiesta
        const nuovoTransito = await transitoRepository.createTransito(req.body);
        res.status(StatusCodes.CREATED).json(nuovoTransito);
    } catch (error) {
        next(error);
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
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(error);
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
            res.status(StatusCodes.NO_CONTENT).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(error);
    }
};