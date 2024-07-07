import { Request, Response, NextFunction } from 'express';
import varcoZtlRepository from '../repositories/varcoZtlRepository';

export const getAllVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const varchiZtl = await varcoZtlRepository.getAllVarcoZtl();
        res.status(200).json(varchiZtl);
    } catch (error) {
        next(error);
    }
};

export const getVarcoZtlById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const varcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
        if (varcoZtl) {
            res.status(200).json(varcoZtl);
        } else {
            res.status(404).json({ message: 'Varco ZTL non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

export const createVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoVarcoZtl = await varcoZtlRepository.createVarcoZtl(req.body);
        res.status(201).json(nuovoVarcoZtl);
    } catch (error) {
        next(error);
    }
};

export const updateVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await varcoZtlRepository.updateVarcoZtl(id, req.body);
        if (updated) {
            const updatedVarcoZtl = await varcoZtlRepository.getVarcoZtlById(id);
            res.status(200).json(updatedVarcoZtl);
        } else {
            res.status(404).json({ message: 'Varco ZTL non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteVarcoZtl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await varcoZtlRepository.deleteVarcoZtl(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Varco ZTL non trovato' });
        }
    } catch (error) {
        next(error);
    }
};
