import { Request, Response, NextFunction } from 'express';
import orarioChiusuraRepository from '../repositories/orarioChiusuraRepository';

// Controller per ottenere tutti gli orari di chiusura
export const getAllOrariChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orariChiusura = await orarioChiusuraRepository.getAllOrariChiusura();
        res.status(200).json(orariChiusura);
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere un orario di chiusura per ID
export const getOrarioChiusuraById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const orarioChiusura = await orarioChiusuraRepository.getOrarioChiusuraById(id);
        if (orarioChiusura) {
            res.status(200).json(orarioChiusura);
        } else {
            res.status(404).json({ message: 'Orario di chiusura non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per creare un nuovo orario di chiusura
export const createOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoOrarioChiusura = await orarioChiusuraRepository.createOrarioChiusura(req.body);
        res.status(201).json(nuovoOrarioChiusura);
    } catch (error) {
        next(error);
    }
};

// Controller per aggiornare un orario di chiusura esistente
export const updateOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await orarioChiusuraRepository.updateOrarioChiusura(id, req.body);
        if (updated) {
            const updatedOrarioChiusura = await orarioChiusuraRepository.getOrarioChiusuraById(id);
            res.status(200).json(updatedOrarioChiusura);
        } else {
            res.status(404).json({ message: 'Orario di chiusura non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per cancellare un orario di chiusura per ID
export const deleteOrarioChiusura = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await orarioChiusuraRepository.deleteOrarioChiusura(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Orario di chiusura non trovato' });
        }
    } catch (error) {
        next(error);
    }
};
