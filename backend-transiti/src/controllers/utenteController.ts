import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import utenteDao from '../dao/utenteDao';
import { StatusCodes } from 'http-status-codes';

/**
 * Funzione per ottenere tutti gli utenti.
 */
export const getUtenti = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const utenti = await utenteDao.getAll();
    res.status(StatusCodes.OK).json(utenti);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli utenti'));
  }
};

/**
 * Funzione per ottenere un utente per ID.
 */
export const getUtenteById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const utente = await utenteDao.getById(id);
    if (utente) {
      res.status(StatusCodes.OK).json(utente);
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'utente'));
  }
};

/**
 * Funzione per creare un nuovo utente.
 */
export const createUtente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuovoUtente = await utenteDao.create(req.body);
    res.status(StatusCodes.CREATED).json(nuovoUtente);
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'utente'));
  }
};

/**
 * Funzione per aggiornare un utente esistente.
 */
export const updateUtente = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const [updated] = await utenteDao.update(id, req.body);
    if (updated) {
      const updatedUtente = await utenteDao.getById(id);
      res.status(StatusCodes.OK).json(updatedUtente);
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nell\'aggiornamento dell\'utente'));
  }
};

/**
 * Funzione per cancellare un utente per ID.
 */
export const deleteUtente = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  try {
    const deleted = await utenteDao.delete(id);
    if (deleted) {
      res.status(StatusCodes.NO_CONTENT).send();
    } else {
      next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
    }
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella cancellazione dell\'utente'));
  }
};