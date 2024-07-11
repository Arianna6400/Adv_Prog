import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { isValidId } from '../utils/utils';
import varcoZtlDao from '../dao/varcoZtlDao';
import zonaZtlDao from '../dao/zonaZtlDao';

export const getAllZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zoneZtl = await zonaZtlDao.getAll();
        res.status(200).json(zoneZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle zone ZTL'));
    }
};

export const getZonaZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (!isValidId(id)) {
        next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID zona ZTL non valido'));
    }

    try {
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

export const createZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingZona = (await zonaZtlDao.getAll()).find(zona => zona.nome === req.body.nome);
        if (existingZona) {
            next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Una zona con questo nome esiste già'));
        }else{
            const nuovaZonaZtl = await zonaZtlDao.create(req.body);
            res.status(201).json(nuovaZonaZtl);
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della zona ZTL'));
    }
};

export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (!isValidId(id)) {
        next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID zona ZTL non valido'));
    }

    try {
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

export const deleteZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (!isValidId(id)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
    }

    try {
        const isNotFree = await (await varcoZtlDao.getAll()).filter((varco => varco.zona_ztl === id)).length;
        if (isNotFree){
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Non è possibile eliminare una zona con varchi associati'));
        }else{
            const deleted = await zonaZtlDao.delete(id);
            console.log
            if (deleted) {
                //res.status(204).send(); // non utilizzo il codice che non restituisce niente
                // stampo messaggio di eliminazione
                res.status(200).json({ message: `Zona ${id} eliminata con successo` });
            } else {
                next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
            }
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della zona ZTL con id ${id}`));
    }
};