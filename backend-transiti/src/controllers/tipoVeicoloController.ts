import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import tipoVeicoloDao from '../dao/tipoVeicoloDao';

/**
 * Funzione per ottenere tutti i tipi di veicolo.
 */
export const getAllTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tipiVeicolo = await tipoVeicoloDao.getAll();
        res.status(200).json(tipiVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei tipi di veicolo'));
    }
};

/**
 * Funzione per ottenere un tipo di veicolo per ID.
 */
export const getTipoVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const tipoVeicolo = await tipoVeicoloDao.getById(id);
        if (tipoVeicolo) {
            res.status(200).json(tipoVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del tipo di veicolo'));
    }
};

/**
 * Funzione per creare un nuovo tipo di veicolo.
 */
export const createTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoTipoVeicolo = await tipoVeicoloDao.create(req.body);
        res.status(201).json(nuovoTipoVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del tipo di veicolo'));
    }
};

/**
 * Funzione per aggiornare un tipo di veicolo esistente.
 */
export const updateTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const [updated] = await tipoVeicoloDao.update(id, req.body);
        if (updated) {
            const updatedTipoVeicolo = await tipoVeicoloDao.getById(id);
            res.status(200).json(updatedTipoVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del tipo di veicolo'));
    }
};

/**
 * Funzione per cancellare un tipo di veicolo per ID.
 */
export const deleteTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        const deleted = await tipoVeicoloDao.delete(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Tipo di veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del tipo di veicolo'));
    }
};