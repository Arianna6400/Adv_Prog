import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw ErrorFactory.createError(ErrorTypes.Unauthorized, 'Access denied. No token provided.');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw ErrorFactory.createError(ErrorTypes.InvalidToken, 'Invalid token.');
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;