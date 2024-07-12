import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { isValidId } from '../utils/utils';
import varcoZtlDao from '../dao/varcoZtlDao';
import zonaZtlDao from '../dao/zonaZtlDao';
/**
 * Funzione per ottenere tutte le zone ZTL.
 */
export const getAllZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zoneZtl = await zonaZtlDao.getAll();
        res.status(200).json(zoneZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle zone ZTL'));
    }
};

/**
 * Funzione per ottenere una zona ZTL per ID.
 */
export const getZonaZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Recupera la zona ZTL dal database usando l'ID
        const zonaZtl = await zonaZtlDao.getById(id);
        if (zonaZtl) {
            res.status(200).json(zonaZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della zona ZTL con id ${id}`));
    }
};

/**
 * Funzione per creare una nuova zona ZTL.
 */
export const createZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Controlla se esiste già una zona con lo  stesso nome
        const existingZona = (await zonaZtlDao.getAll()).find(zona => zona.nome === req.body.nome);
        if (existingZona) {
            next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Una zona con questo nome esiste già'));
        }else{
            // Crea una nuova zona ZTL
            const nuovaZonaZtl = await zonaZtlDao.create(req.body);
            res.status(201).json(nuovaZonaZtl);
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della zona ZTL'));
    }
};

/**
 * Funzione per aggiornare una zona ZTL esistente.
 */
export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Aggiorna la zona ZTL esistente con i dati forniti nel corpo della richiesta
        const [updated] = await zonaZtlDao.update(id, req.body);
        if (updated) {
            const updatedZonaZtl = await zonaZtlDao.getById(id);
            res.status(200).json(updatedZonaZtl);
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento della zona ZTL con id ${id}`));
    }
};

/**
 * Funzione per cancellare una zona ZTL per ID.
 */
export const deleteZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    try {
        // Controlla se esistono varchi associati alla zona ZTL
        const isNotFree = await (await varcoZtlDao.getAll()).filter((varco => varco.zona_ztl === id)).length;
        if (isNotFree){
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Non è possibile eliminare una zona con varchi associati'));
        }else{
            // Cancella la zona ZTL esistente
            const deleted = await zonaZtlDao.delete(id);
            console.log
            if (deleted) {
                res.status(200).json({ message: `Zona ${id} eliminata con successo` });
            } else {
                next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della zona ZTL con id ${id}`));
    }
};