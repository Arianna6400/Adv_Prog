import { Request, Response, NextFunction } from 'express';
import transitoRepository from '../repositories/transitoRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { isValidTarga } from './veicoloController';

export const getAllTransiti = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transiti = await transitoRepository.getAllTransiti();
        res.status(200).json(transiti);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti'));
    }
};

export const getTransitoById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const transito = await transitoRepository.getTransitoById(id);
        if (transito) {
            res.status(200).json(transito);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del transito'));
    }
};

export const createTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoTransito = await transitoRepository.createTransito(req.body);
        res.status(201).json(nuovoTransito);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del transito'));
    }
};

export const updateTransito = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const [updated] = await transitoRepository.updateTransito(id, req.body);
        if (updated) {
            const updatedTransito = await transitoRepository.getTransitoById(id);
            res.status(200).json(updatedTransito);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del transito'));
    }
};

export const deleteTransito = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const deleted = await transitoRepository.deleteTransito(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Transito non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del transito'));
    }
};