import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

/**
 * Middleware di autenticazione
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // estrazione del token dall'intestazione della richiesta
    if (!token) {
      throw ErrorFactory.createError(ErrorTypes.Unauthorized, 'Accesso negato. Nessun token fornito.');
    }
    // decodifica e verifica il token
    const decoded = verifyToken(token);
    if (!decoded) {
      throw ErrorFactory.createError(ErrorTypes.InvalidToken, 'Token non valido.');
    }

    (req as any).user = decoded; // attacca l'informazione a req per usarla nei middleware successivi
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * verifica autorizzazione in base ad un array di ruoli per gli utenti
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // recupera l'utente autenticato
      const user = (req as any).user;
      if (!user) {
        throw ErrorFactory.createError(ErrorTypes.Unauthorized, 'Utente non autenticato in pagamenti.');
      }
      // se il ruolo non è presente tra quelli autorizzati genera l'errore
      if (!roles.includes(user.ruolo)) {
        throw ErrorFactory.createError(ErrorTypes.Forbidden, 'Accesso negato.');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default { authMiddleware, authorize };