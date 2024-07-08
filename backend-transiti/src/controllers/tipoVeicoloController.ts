import { Request, Response, NextFunction } from 'express';
import tipoVeicoloRepository from '../repositories/tipoVeicoloRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Controller per ottenere tutti i tipi di veicolo
export const getAllTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tipiVeicolo = await tipoVeicoloRepository.getAllTipoVeicolo();
        res.status(200).json(tipiVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei tipi di veicolo'));
    }
};

// Controller per ottenere un tipo di veicolo per ID
export const getTipoVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const tipoVeicolo = await tipoVeicoloRepository.getTipoVeicoloById(id);
        if (tipoVeicolo) {
            res.status(200).json(tipoVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del tipo di veicolo'));
    }
};

// Controller per creare un nuovo tipo di veicolo
export const createTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoTipoVeicolo = await tipoVeicoloRepository.createTipoVeicolo(req.body);
        res.status(201).json(nuovoTipoVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del tipo di veicolo'));
    }
};

// Controller per aggiornare un tipo di veicolo esistente
export const updateTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const [updated] = await tipoVeicoloRepository.updateTipoVeicolo(id, req.body);
        if (updated) {
            const updatedTipoVeicolo = await tipoVeicoloRepository.getTipoVeicoloById(id);
            res.status(200).json(updatedTipoVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del tipo di veicolo'));
    }
};

// Controller per cancellare un tipo di veicolo per ID
export const deleteTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID non valido'));
    }

    try {
        const deleted = await tipoVeicoloRepository.deleteTipoVeicolo(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del tipo di veicolo'));
    }
};