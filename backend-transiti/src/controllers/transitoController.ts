import { Request, Response, NextFunction } from 'express';
import transitoRepository from '../repositories/transitoRepository';

export const getAllTransiti = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transiti = await transitoRepository.getAllTransiti();
        res.status(200).json(transiti);
    } catch (error) {
        next(error);
    }
};

export const getTransitoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const transito = await transitoRepository.getTransitoById(id);
        if (transito) {
            res.status(200).json(transito);
        } else {
            res.status(404).json({ message: 'Transito non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

export const createTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoTransito = await transitoRepository.createTransito(req.body);
        res.status(201).json(nuovoTransito);
    } catch (error) {
        next(error);
    }
};

export const updateTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await transitoRepository.updateTransito(id, req.body);
        if (updated) {
            const updatedTransito = await transitoRepository.getTransitoById(id);
            res.status(200).json(updatedTransito);
        } else {
            res.status(404).json({ message: 'Transito non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteTransito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await transitoRepository.deleteTransito(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Transito non trovato' });
        }
    } catch (error) {
        next(error);
    }
};
