import { Request, Response, NextFunction } from 'express';
import varcoZtlRepository from '../repositories/varcoZtlRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Controller per ottenere tutti i varchi ZTL
export const getAllVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const varchiZtl = await varcoZtlRepository.getAllVarcoZtl();
        res.status(200).json(varchiZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei varchi ZTL'));
    }
};

// Controller per ottenere un varco ZTL per ID
export const getVarcoZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 0) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
    }

    try {
        const varcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
        if (varcoZtl) {
            res.status(200).json(varcoZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del varco ZTL'));
    }
};

// Controller per creare un nuovo varco ZTL
export const createVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoVarcoZtl = await varcoZtlRepository.createVarcoZtl(req.body);
        res.status(201).json(nuovoVarcoZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL'));
    }
};

// Controller per aggiornare un varco ZTL esistente
export const updateVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 0) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
    }

    try {
        const [updated] = await varcoZtlRepository.updateVarcoZtl(id, req.body);
        if (updated) {
            const updatedVarcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
            res.status(200).json(updatedVarcoZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del varco ZTL'));
    }
};

// Controller per cancellare un varco ZTL per ID
export const deleteVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id < 0) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
    }

    try {
        const deleted = await varcoZtlRepository.deleteVarcoZtl(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del varco ZTL'));
    }
};