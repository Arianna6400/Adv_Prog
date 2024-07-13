import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import veicoloDao from '../dao/veicoloDao';
import { StatusCodes } from 'http-status-codes';

// Funzione di utilità per validare il formato della targa
export const isValidTarga = (targa: string): boolean => {
    const targaRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    return targaRegex.test(targa);
};

/**
 * Funzione per ottenere tutti i veicoli.
 */
export const getAllVeicoli = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Recupera tutti i veicoli dal DAO
        const veicoli = await veicoloDao.getAll();
        res.status(StatusCodes.OK).json(veicoli);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli'));
    }
};

/**
 * Funzione per ottenere un veicolo per targa.
 */
export const getVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    // Validazione del formato della targa
    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        // Recupera il veicolo dal DAO utilizzando la targa
        const veicolo = await veicoloDao.getById(targa);
        if (veicolo) {
            res.status(StatusCodes.OK).json(veicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del veicolo'));
    }
};

/**
 * Funzione per creare un nuovo veicolo.
 */
export const createVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.body;

    // Validazione del formato della targa
    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        // Crea un nuovo veicolo utilizzando i dati dal corpo della richiesta
        const nuovoVeicolo = await veicoloDao.create(req.body);
        res.status(StatusCodes.CREATED).json(nuovoVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del veicolo'));
    }
};

/**
 * Funzione per aggiornare un veicolo esistente.
 */
export const updateVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    // Validazione del formato della targa
    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        // Aggiorna il veicolo utilizzando i dati dal corpo della richiesta
        const [updated] = await veicoloDao.update(targa, req.body);
        if (updated) {
            // Recupera il veicolo aggiornato dal DAO
            const updatedVeicolo = await veicoloDao.getById(targa);
            res.status(StatusCodes.OK).json(updatedVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del veicolo'));
    }
};

/**
 * Funzione per cancellare un veicolo per targa
 */
export const deleteVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    // Validazione del formato della targa
    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        // Cancella il veicolo utilizzando la targa
        const deleted = await veicoloDao.delete(targa);
        if (deleted) {
            res.status(StatusCodes.NO_CONTENT).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del veicolo'));
    }
};
