import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import varcoZtlDao from '../dao/varcoZtlDao';
import zonaZtlDao from '../dao/zonaZtlDao';
import { StatusCodes } from 'http-status-codes';
import zonaZtlRepository from '../repositories/zonaZtlRepository';
import varcoZtlRepository from '../repositories/varcoZtlRepository';
/**
 * Funzione per ottenere tutte le zone ZTL.
 */
export const getAllZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zoneZtl = await zonaZtlRepository.getAllZonaZtl();
        res.status(StatusCodes.OK).json(zoneZtl);
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per ottenere una zona ZTL per ID.
 */
export const getZonaZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Recupera la zona ZTL dal DAO usando l'ID
        const zonaZtl = await zonaZtlRepository.getZonaZtlById(id);
        if (zonaZtl) {
            res.status(StatusCodes.OK).json(zonaZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per ottenere una zona ZTL per ID con tutti i transiti associati
 */
export const getZonaZtlWithTransiti = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Recupera la zona ZTL dal repository usando l'ID
        const zonaZtl = await zonaZtlRepository.getZonaZtlWithTransiti(id);
        if (zonaZtl) {
            res.status(StatusCodes.OK).json(zonaZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per creare una nuova zona ZTL.
 */
export const createZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // normalizzo in minuscolo togliendo spazi per confrontare i nomei
        const normalizedName = (req.body.nome).replace(/\s+/g, '').toLowerCase();
        // Controlla se esiste già una zona con lo stesso nome
        const existingZona = (await zonaZtlRepository.getAllZonaZtl()).find(zona => (zona.nome).replace(/\s+/g, '').toLowerCase() === normalizedName);
        
        if (existingZona) {
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Una zona con questo nome esiste già'));
        }else{
            // Crea una nuova zona ZTL
            const nuovaZonaZtl = await zonaZtlRepository.createZonaZtl(req.body);
            res.status(StatusCodes.CREATED).json(nuovaZonaZtl);
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per aggiornare una zona ZTL esistente.
 */
export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Aggiorna la zona ZTL esistente con i dati forniti nel corpo della richiesta
        const [updated] = await zonaZtlRepository.updateZonaZtl(id, req.body);
        if (updated) {
            const updatedZonaZtl = await zonaZtlRepository.getZonaZtlById(id);
            res.status(StatusCodes.OK).json(updatedZonaZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per cancellare una zona ZTL per ID.
 */
export const deleteZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Controlla se esistono varchi associati alla zona ZTL
        const isNotFree = await (await varcoZtlRepository.getAllVarcoZtl()).filter((varco => varco.zona_ztl === id)).length;
        if (isNotFree){
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Non è possibile eliminare una zona con varchi associati'));
        }else{
            // Cancella la zona ZTL esistente
            const deleted = await zonaZtlRepository.deleteZonaZtl(id);
            console.log
            if (deleted) {
                res.status(StatusCodes.NO_CONTENT).json({ message: `Zona ${id} eliminata con successo` });
            } else {
                next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        }
    } catch (error) {
        next(error);
    }
};