import { Request, Response, NextFunction } from 'express';
import veicoloRepository from '../repositories/veicoloRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per validare la targa del veicolo
export const isValidTarga = (targa: string): boolean => {
    const targaRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    return targaRegex.test(targa);
};

// Controller per ottenere tutti i veicoli
export const getAllVeicoli = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veicoli = await veicoloRepository.getAllVeicoli();
        res.status(200).json(veicoli);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli'));
    }
};

// Controller per ottenere un veicolo per targa
export const getVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        const veicolo = await veicoloRepository.getVeicoloById(targa);
        if (veicolo) {
            res.status(200).json(veicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero del veicolo'));
    }
};

// Controller per ottenere una lista dei veicolli esenti
export const getVeicoliEsenti = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veicoliEsenti = await veicoloRepository.getVeicoliEsenti();
        res.status(200).json(veicoliEsenti);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli esenti'));
    }
};

// Controller per creare un nuovo veicolo
export const createVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.body;

    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        const nuovoVeicolo = await veicoloRepository.createVeicolo(req.body);
        res.status(201).json(nuovoVeicolo);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del veicolo'));
    }
};

// Controller per aggiornare un veicolo esistente
export const updateVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        const [updated] = await veicoloRepository.updateVeicolo(targa, req.body);
        if (updated) {
            const updatedVeicolo = await veicoloRepository.getVeicoloById(targa);
            res.status(200).json(updatedVeicolo);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento del veicolo'));
    }
};

// Controller per cancellare un veicolo per targa
export const deleteVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        const deleted = await veicoloRepository.deleteVeicolo(targa);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Veicolo non trovato'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione del veicolo'));
    }
};
