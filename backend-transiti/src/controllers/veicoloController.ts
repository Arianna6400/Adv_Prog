import { Request, Response, NextFunction } from 'express';
import veicoloRepository from '../repositories/veicoloRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per validare la targa del veicolo
const isValidTarga = (targa: string): boolean => {
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

// Controller per ottenere tutti i transiti di un veicolo
export const getTransitiByVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    const { targa } = req.params;

    if (!isValidTarga(targa)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'Formato targa non valido'));
    }

    try {
        const transiti = await veicoloRepository.getTransitiByVeicolo(targa);
        if (transiti.length > 0) {
            res.status(200).json(transiti);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Nessun transito trovato per questo veicolo'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti per il veicolo'));
    }
};