import { Request, Response, NextFunction } from 'express';
import varcoZtlRepository from '../repositories/varcoZtlRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
/**
 * Funzione per ottenere tutti i varchi ZTL
 */
export const getAllVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Recupera i varchi ZTL dal repository
        const varchiZtl = await varcoZtlRepository.getAllVarcoZtl();
        res.status(200).json(varchiZtl);
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per ottenere un varco ZTL per ID
 */
export const getVarcoZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Recupera il varco ZTL dal repository usando l'ID
        const varcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
        if (varcoZtl) {
            res.status(200).json(varcoZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per creare un nuovo varco ZTL
 */
export const createVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingVarco = (await varcoZtlRepository.getAllVarcoZtl()).find(varco => varco.nome === req.body.nome);
        if(existingVarco){
            next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Un varco con questo nome esiste già'));
        }
        // Crea un nuovo varco ZTL usando i dati forniti nel corpo della richiesta
        const nuovoVarcoZtl = await varcoZtlRepository.createVarcoZtl(req.body);
        res.status(201).json(nuovoVarcoZtl);
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per aggiornare un varco ZTL esistente
 */
export const updateVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {
        // Aggiorna il varco ZTL esistente con i dati forniti nel corpo della richesta
        const [updated] = await varcoZtlRepository.updateVarcoZtl(id, req.body);
        if (updated) {
            const updatedVarcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
            res.status(200).json(updatedVarcoZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per cancellare un varco ZTL per ID
 */
export const deleteVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Cancella il varco ZTL esistente usando l'ID fornito
        const deleted = await varcoZtlRepository.deleteVarcoZtl(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        next(error);
    }
};