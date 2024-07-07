// Middleware per la protezione delle rotte tramite autenticazione con JWT

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
      return res.status(400).json({ message: 'Invalid token.' });
  }
  (req as any).user = decoded;
  next();
};

export default authMiddleware;

