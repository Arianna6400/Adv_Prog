
import { Request, Response, NextFunction } from 'express';
import utenteRepository from '../repositories/utenteRepository';

// Controller per ottenere tutti gli utenti
export const getUtenti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const utenti = await utenteRepository.getAllUtenti();
    res.status(200).json(utenti);
  } catch (error) {
    next(error);
  }
};

// Controller per ottenere un utente per ID
export const getUtenteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const utente = await utenteRepository.getUtenteById(id);
    if (utente) {
      res.status(200).json(utente);
    } else {
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller per creare un nuovo utente
export const createUtente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuovoUtente = await utenteRepository.createUtente(req.body);
    res.status(201).json(nuovoUtente);
  } catch (error) {
    next(error);
  }
};

// Controller per aggiornare un utente esistente
export const updateUtente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await utenteRepository.updateUtente(id, req.body);
    if (updated) {
      const updatedUtente = await utenteRepository.getUtenteById(id);
      res.status(200).json(updatedUtente);
    } else {
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller per cancellare un utente per ID
export const deleteUtente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await utenteRepository.deleteUtente(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Utente non trovato' });
    }
  } catch (error) {
    next(error);
  }
};

// Controller per ottenere tutti i veicoli di un utente
export const getVeicoliByUtenteId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const veicoli = await utenteRepository.getVeicoliByUtenteId(id);
    if (veicoli.length > 0) {
      res.status(200).json(veicoli);
    } else {
      res.status(404).json({ message: 'Nessun veicolo trovato per questo utente' });
    }
  } catch (error) {
    next(error);
  }
};