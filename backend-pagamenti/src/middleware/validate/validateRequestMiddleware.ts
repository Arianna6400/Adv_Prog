import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ErrorFactory, ErrorTypes } from '../../utils/errorFactory';

/**
 * Middleware di validazione dei dati inseriti nelle rotte
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); // recupero gli errori di validazione

  // Se ci sono errori accumulati allora ritorno l'errore
  if (!errors.isEmpty()) {
    return next(ErrorFactory.createError(ErrorTypes.BadRequest, 
      'Errore di validazione: ' + errors.array().map(e => e.msg).join(', '))); // Mappo ed unisco tutti i messaggi di errore in un array
  }
  next(); // Passaggio dell'errore al middleware successivo
};

export default validateRequest;