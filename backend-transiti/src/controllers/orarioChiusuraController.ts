import { Request, Response, NextFunction } from 'express';
import orarioChiusuraRepository from '../repositories/orarioChiusuraRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Controller per ottenere tutti gli orari di chiusura
export const getAllOrariChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orariChiusura = await orarioChiusuraRepository.getAllOrariChiusura();
        res.status(200).json(orariChiusura);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli orari di chiusura'));
    }
};

// Controller per ottenere un orario di chiusura per ID
export const getOrarioChiusuraById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const orarioChiusura = await orarioChiusuraRepository.getOrarioChiusuraById(id);
        if (orarioChiusura) {
            res.status(200).json(orarioChiusura);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'orario di chiusura'));
    }
};

// Controller per creare un nuovo orario di chiusura
export const createOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoOrarioChiusura = await orarioChiusuraRepository.createOrarioChiusura(req.body);
        res.status(201).json(nuovoOrarioChiusura);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'orario di chiusura'));
    }
};

// Controller per aggiornare un orario di chiusura esistente
export const updateOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const [updated] = await orarioChiusuraRepository.updateOrarioChiusura(id, req.body);
        if (updated) {
            const updatedOrarioChiusura = await orarioChiusuraRepository.getOrarioChiusuraById(id);
            res.status(200).json(updatedOrarioChiusura);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento dell\'orario di chiusura'));
    }
};

// Controller per cancellare un orario di chiusura per ID
export const deleteOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const deleted = await orarioChiusuraRepository.deleteOrarioChiusura(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Orario di chiusura non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione dell\'orario di chiusura'));
    }
};