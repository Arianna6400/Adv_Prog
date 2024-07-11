import { Request, Response, NextFunction } from 'express';
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import axios from 'axios';


export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.body; // UUID multa passato nel body

    if (!uuid) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'UUID non fornito'));
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.post('/pagamulta', { uuid });
        res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nel pagamento';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel pagamento'));
    }
};

export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { id, tokens } = req.body;

    if (!id || !tokens) {
        return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'ID o tokens non forniti'));
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.post('/ricaricatoken', { id, tokens });
        res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nella ricarica';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella ricarica'));
    }
};

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ErrorFactory.createError(ErrorTypes.Unauthorized, 'Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.get('/tokenresidui');
        res.status(200).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error.message || 'Errore nel recupero dei token';
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, message));
        }
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei token'));
    }
};