import { Request, Response, NextFunction } from 'express';
import tipoVeicoloRepository from '../repositories/tipoVeicoloRepository';

// Controller per ottenere tutti i tipi di veicolo
export const getAllTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tipiVeicolo = await tipoVeicoloRepository.getAllTipoVeicolo();
        res.status(200).json(tipiVeicolo);
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere un tipo di veicolo per ID
export const getTipoVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const tipoVeicolo = await tipoVeicoloRepository.getTipoVeicoloById(id);
        if (tipoVeicolo) {
            res.status(200).json(tipoVeicolo);
        } else {
            res.status(404).json({ message: 'Tipo di veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per creare un nuovo tipo di veicolo
export const createTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoTipoVeicolo = await tipoVeicoloRepository.createTipoVeicolo(req.body);
        res.status(201).json(nuovoTipoVeicolo);
    } catch (error) {
        next(error);
    }
};

// Controller per aggiornare un tipo di veicolo esistente
export const updateTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const [updated] = await tipoVeicoloRepository.updateTipoVeicolo(id, req.body);
        if (updated) {
            const updatedTipoVeicolo = await tipoVeicoloRepository.getTipoVeicoloById(id);
            res.status(200).json(updatedTipoVeicolo);
        } else {
            res.status(404).json({ message: 'Tipo di veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per cancellare un tipo di veicolo per ID
export const deleteTipoVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await tipoVeicoloRepository.deleteTipoVeicolo(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tipo di veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};
