import { Request, Response, NextFunction } from 'express';
import axiosInstance, { setAuthToken } from '../utils/axiosInstance';
import axios from 'axios';

export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.query as { uuid: string };

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error('Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.post('/pagamulta', null, { params: { uuid } });
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.query.id as string, 10);
    const tokens = Number(req.query.tokens as string);

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error('Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.post('/ricaricatoken',null,  {params: { id, tokens }});
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error('Token non fornito'));
        }
        setAuthToken(token);

        const response = await axiosInstance.get('/tokenresidui');
        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};