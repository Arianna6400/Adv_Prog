import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import utenteDao from '../dao/utenteDao';

// Controller per ottenere tutti gli utenti
export const getUtenti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const utenti = await utenteDao.getAll();
    res.status(200).json(utenti); // O res.status(200).send(utenti);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli utenti'));
  }
};

// Controller per ottenere un utente per ID
export const getUtenteById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id < 0) {
    return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
  }

  try {
    const utente = await utenteDao.getById(id);
    if (utente) {
      res.status(200).json(utente);
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'utente'));
  }
};

// Controller per creare un nuovo utente
export const createUtente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuovoUtente = await utenteDao.create(req.body);
    res.status(201).json(nuovoUtente);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'utente'));
  }
};

// Controller per aggiornare un utente esistente
export const updateUtente = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id < 0) {
    return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
  }

  try {
    const [updated] = await utenteDao.update(id, req.body);
    if (updated) {
      const updatedUtente = await utenteDao.getById(id);
      res.status(200).json(updatedUtente);
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento dell\'utente'));
  }
};

// Controller per cancellare un utente per ID
export const deleteUtente = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id < 0) {
    return next(ErrorFactory.createError(ErrorTypes.InvalidID, 'ID non valido'));
  }

  try {
    const deleted = await utenteDao.delete(id);
    if (deleted) {
      res.status(204).send();
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione dell\'utente'));
  }
};