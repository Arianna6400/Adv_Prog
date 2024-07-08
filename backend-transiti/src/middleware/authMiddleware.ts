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
    const user = (req as any).user;
    if (!roles.includes(user.ruolo)) {
      return next(ErrorFactory.createError(ErrorTypes.Forbidden, 'Accesso negato.'));
    }
    next();
  };
};

export default { authMiddleware, authorize };