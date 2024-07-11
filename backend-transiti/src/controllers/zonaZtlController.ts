import { Request, Response, NextFunction } from 'express';
import zonaZtlRepository from '../repositories/zonaZtlRepository';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

// Funzione per validare l'ID
const isValidId = (id: number): boolean => !isNaN(id) && id >= 0;

export const getAllZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zoneZtl = await zonaZtlRepository.getAllZonaZtl();
        res.status(200).json(zoneZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle zone ZTL'));
    }
};

export const getZonaZtlById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (!isValidId(id)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID zona ZTL non valido'));
    }

    try {
        const zonaZtl = await zonaZtlRepository.getZonaZtlById(id);
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
        const nuovaZonaZtl = await zonaZtlRepository.createZonaZtl(req.body);
        res.status(201).json(nuovaZonaZtl);
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della zona ZTL'));
    }
};

export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (!isValidId(id)) {
        return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID zona ZTL non valido'));
    }

    try {
        const [updated] = await zonaZtlRepository.updateZonaZtl(id, req.body);
        if (updated) {
            const updatedZonaZtl = await zonaZtlRepository.getZonaZtlById(id);
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
        const deleted = await zonaZtlRepository.deleteZonaZtl(id);
        if (deleted) {
            res.status(204).send();
        } else {
            next(ErrorFactory.createError(ErrorTypes.NotFound, 'Zona ZTL non trovata'));
        }
    } catch (error) {
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della zona ZTL con id ${id}`));
    }
};