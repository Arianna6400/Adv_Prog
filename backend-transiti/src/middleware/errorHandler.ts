import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errorFactory';

// Middleware per la gestione centralizzata degli errori
export const errorHandler = () => {
  return (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const code = err.code || 'INTERNAL_SERVER_ERROR';

    // Log dell'errore (opzionale, utile per il debugging)
    console.error(`Error: ${message} (Status code: ${statusCode}, Code: ${code})`);

    res.status(statusCode).json({ error: message, code: code });
  };
};