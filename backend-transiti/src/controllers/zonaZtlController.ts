import { Request, Response, NextFunction } from 'express';
import zonaZtlRepository from '../repositories/zonaZtlRepository';

export const getAllZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const zoneZtl = await zonaZtlRepository.getAllZonaZtl();
        res.status(200).json(zoneZtl);
    } catch (error) {
        next(error);
    }
};

export const getZonaZtlById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const zonaZtl = await zonaZtlRepository.getZonaZtlById(id);
        if (zonaZtl) {
            res.status(200).json(zonaZtl);
        } else {
            res.status(404).json({ message: 'Zona ZTL non trovata' });
        }
    } catch (error) {
        next(error);
    }
};

export const createZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovaZonaZtl = await zonaZtlRepository.createZonaZtl(req.body);
        res.status(201).json(nuovaZonaZtl);
    } catch (error) {
        next(error);
    }
};

export const updateZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await zonaZtlRepository.updateZonaZtl(id, req.body);
        if (updated) {
            const updatedZonaZtl = await zonaZtlRepository.getZonaZtlById(id);
            res.status(200).json(updatedZonaZtl);
        } else {
            res.status(404).json({ message: 'Zona ZTL non trovata' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteZonaZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await zonaZtlRepository.deleteZonaZtl(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Zona ZTL non trovata' });
        }
    } catch (error) {
        next(error);
    }
};
