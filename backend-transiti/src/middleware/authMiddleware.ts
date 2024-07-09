import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw ErrorFactory.createError(ErrorTypes.Unauthorized, 'Accesso negato. Nessun token fornito.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw ErrorFactory.createError(ErrorTypes.InvalidToken, 'Token non valido.');
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user) {
        throw ErrorFactory.createError(ErrorTypes.Unauthorized, 'Utente non autenticato in transiti.');
      }

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