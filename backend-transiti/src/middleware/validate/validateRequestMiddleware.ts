/**
 * Middleware di validazione dei dati inseriti nelle rotte
 */
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../../utils/errorFactory';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); // recupero gli errori di validazione

  // se ci sono errori accumulati allora ritorno l'errore
  if (!errors.isEmpty()) {
    return next(ErrorFactory.createError(ErrorTypes.BadRequest, 
        'Errore di validazione: ' + errors.array().map(e => e.msg).join(', '))); // mappo ed unisco tutti i messaggi di errore in un array
  }
  next(); // passaggio dell'errore al middleware successivo
};

export default validateRequest;

