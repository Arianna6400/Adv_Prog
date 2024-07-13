import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import orarioChiusuraDao from '../dao/orarioChiusuraDao';

/**
 * Funzione per ottenere tutti gli orari di chiusura.
 */
export const getAllOrariChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orariChiusura = await orarioChiusuraDao.getAll();
        res.status(200).json(orariChiusura);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli orari di chiusura'));
    }
};

/**
 * Funzione per ottenere un orario di chiusura per ID.
 */
export const getOrarioChiusuraById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const orarioChiusura = await orarioChiusuraDao.getById(id);
        if (orarioChiusura) {
            res.status(200).json(orarioChiusura);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'orario di chiusura'));
    }
};

/**
 * Funzione per creare un nuovo orario di chiusura.
 */
export const createOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoOrarioChiusura = await orarioChiusuraDao.create(req.body);
        res.status(201).json(nuovoOrarioChiusura);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'orario di chiusura'));
    }
};

/**
 * Funzione per aggiornare un orario di chiusura esistente.
 */
export const updateOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const [updated] = await orarioChiusuraDao.update(id, req.body);
        if (updated) {
            const updatedOrarioChiusura = await orarioChiusuraDao.getById(id);
            res.status(200).json(updatedOrarioChiusura);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento dell\'orario di chiusura'));
    }
};

/**
 * Funzione per cancellare unn orario di chiusura per ID.
 */
export const deleteOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await orarioChiusuraDao.delete(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione dell\'orario di chiusura'));
    }
};