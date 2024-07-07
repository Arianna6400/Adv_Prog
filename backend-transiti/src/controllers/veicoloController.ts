import { Request, Response, NextFunction } from 'express';
import veicoloRepository from '../repositories/veicoloRepository';

// Controller per ottenere tutti i veicoli
export const getAllVeicoli = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veicoli = await veicoloRepository.getAllVeicoli();
        res.status(200).json(veicoli);
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere un veicolo per targa
export const getVeicoloById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const targa = req.params.targa;
        const veicolo = await veicoloRepository.getVeicoloById(targa);
        if (veicolo) {
            res.status(200).json(veicolo);
        } else {
            res.status(404).json({ message: 'Veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per creare un nuovo veicolo
export const createVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nuovoVeicolo = await veicoloRepository.createVeicolo(req.body);
        res.status(201).json(nuovoVeicolo);
    } catch (error) {
        next(error);
    }
};

// Controller per aggiornare un veicolo esistente
export const updateVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const targa = req.params.targa;
        const [updated] = await veicoloRepository.updateVeicolo(targa, req.body);
        if (updated) {
            const updatedVeicolo = await veicoloRepository.getVeicoloById(targa);
            res.status(200).json(updatedVeicolo);
        } else {
            res.status(404).json({ message: 'Veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per cancellare un veicolo per targa
export const deleteVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const targa = req.params.targa;
        const deleted = await veicoloRepository.deleteVeicolo(targa);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Veicolo non trovato' });
        }
    } catch (error) {
        next(error);
    }
};

// Controller per ottenere tutti i transiti di un veicolo
export const getTransitiByVeicolo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const targa = req.params.targa;
        const transiti = await veicoloRepository.getTransitiByVeicolo(targa);
        if (transiti.length > 0) {
            res.status(200).json(transiti);
        } else {
            res.status(404).json({ message: 'Nessun transito trovato per questo veicolo' });
        }
    } catch (error) {
        next(error);
    }
};
