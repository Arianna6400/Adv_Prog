import { Request, Response, NextFunction } from 'express';
import varcoZtlRepository from '../repositories/varcoZtlRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';

/**
 * Funzione per gestire le richieste ai varchi ZTL.
 */
export const handleVarcoZtlRequests = async (req: Request, res: Response, next: NextFunction) => {
    const { id, transiti } = req.params;

    try {
        if (id && transiti === 'transiti') {
            // Se c'è un ID e 'transiti' è esattamente uguale a 'transiti', recupera il varco ZTL con i transiti associati
            const varcoZtlWithTransiti = await varcoZtlRepository.getVarcoZtlWithTransiti(parseInt(id));
            if (varcoZtlWithTransiti) {
                return res.status(StatusCodes.OK).json(varcoZtlWithTransiti);
            } else {
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
            }
        } else if (id && !transiti) {
            // Se c'è solo l'ID, recupera il varco ZTL specifico
            const varcoZtl = await varcoZtlRepository.getVarcoZtlById(parseInt(id));
            if (varcoZtl) {
                return res.status(StatusCodes.OK).json(varcoZtl);
            } else {
                return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
            }
        } else if (!id && !transiti) {
            // Se non c'è un ID, recupera tutti i varchi ZTL
            const varchiZtl = await varcoZtlRepository.getAllVarcoZtl();
            return res.status(StatusCodes.OK).json(varchiZtl);
        } else {
            // Se il parametro transiti è presente ma non è valido
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Rotta non trovata'));
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per creare un nuovo varco ZTL
 */
export const createVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // normalizzo in minuscolo togliendo spazi per confrontare i nomei
        const normalizedName = (req.body.nome).replace(/\s+/g, '').toLowerCase();
        // Controlla se esiste già un varco con lo stesso nome
        const existingVarco = (await varcoZtlRepository.getAllVarcoZtl()).find(varco => (varco.nome).replace(/\s+/g, '').toLowerCase() === normalizedName);
        
        if(existingVarco){
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Un varco con questo nome esiste già'));
        } else {
            // Crea un nuovo varco ZTL usando i dati forniti nel corpo della richiesta
            const nuovoVarcoZtl = await varcoZtlRepository.createVarcoZtl(req.body);
            res.status(StatusCodes.CREATED).json(nuovoVarcoZtl);
        }
    } catch (error) {
        return next(error);
    }
};

/**
 * Funzione per aggiornare un varco ZTL esistente
 */
export const updateVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    
    try {

        // normalizzo in minuscolo togliendo spazi per confrontare i nomei
        const normalizedName = (req.body.nome).replace(/\s+/g, '').toLowerCase();
        // Controlla se esiste già un varco con lo stesso nome
        const existingVarco = (await varcoZtlRepository.getAllVarcoZtl()).find(varco => (varco.nome).replace(/\s+/g, '').toLowerCase() === normalizedName);
        if(existingVarco){
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Un varco con questo nome esiste già'));
        }
        
        // Aggiorna il varco ZTL esistente con i dati forniti nel corpo della richesta
        const [updated] = await varcoZtlRepository.updateVarcoZtl(id, req.body);
        if (updated) {
            const updatedVarcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
            res.status(StatusCodes.OK).json(updatedVarcoZtl);
        } else {
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        return next(error);
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
            res.status(StatusCodes.OK).json({ message: `Varco ${id} eliminato con successo` });
        } else {
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato'));
        }
    } catch (error) {
        return next(error);
    }
};