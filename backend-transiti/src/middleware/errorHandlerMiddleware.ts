import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errorFactory';

/**
 * prende in input un errore err, scompone le sue proprietà e struttura la risposta da inviare al client
 * @param err: errore da scomporre per strutturare la risposta in caso di errore
 */
export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: {
            statusCode,
            code,
            message,
        },
    });
};