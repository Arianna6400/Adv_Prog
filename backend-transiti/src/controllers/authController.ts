import { Request, Response, NextFunction } from 'express';
import User from '../models/utente';
import { generateToken } from '../utils/jwt';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
/**
 * Funzione per la gestione di una richiesta di login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  // Estrae l'email dal corpo della richiesta o dai parametri della query
  const email = req.body.email || req.query.email;

  // Se l'email non è fornita, ritorna un errore di richiesta errata
  if (!email) {
    return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Email non fornita'));
  }

  try {
    // Cerca un utente nel database usando l'email fornita
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ErrorFactory.createError(ErrorTypes.Unauthorized, `Nessun utente con email ${email}`));
      
    }
    // Genera il token, email potrebbe essere opzionale
    const token = generateToken({ id: user.id_utente, email: user.email, ruolo: user.ruolo});
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore del server'));
  }
};