import { Request, Response, NextFunction } from 'express';
import multaDao from '../dao/multaDao';
import utenteDao from '../dao/utenteDao';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { JwtPayload } from 'jsonwebtoken';
import Database from '../utils/database';

export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.query.uuid as string; // Assumi che l'UUID sia passato come parametro URL
    const { email } = (req as any).user; // Assumi che l'email dell'utente sia nel payload del token JWT
    console.log('UUID ', uuid);

    const sequelize = Database.getInstance();
    const transaction = await sequelize.transaction();

    try {
        const multa = await multaDao.getMultaByUUID(uuid, { transaction });
        if (!multa) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
        }

        if (multa.pagata) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Multa già pagata'));
        }

        const utente = await utenteDao.getByEmail(email, { transaction });
        if (!utente) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
        }

        if (utente.token_rimanenti < multa.importo_token) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Token insufficienti'));
        }

        utente.token_rimanenti -= multa.importo_token;
        multa.pagata = true;
        
        await utente.save({ transaction });
        await multa.save({ transaction });

        await transaction.commit();

        res.status(200).json({ message: 'Pagamento effettuato con successo' });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { email, tokens } = req.query;

    try {
        const utente = await utenteDao.rechargeTokens(email as string, parseInt(tokens as string, 10));
        res.status(200).json({ message: 'Token ricaricati con successo', utente });
    } catch (error) {
        next(error);
    }
};

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = (req as any).user as JwtPayload;
        const tokenRimanenti = await utenteDao.checkTokenByEmail(email);
        res.status(200).json({ token_rimanenti: tokenRimanenti });
    } catch (error) {
        next(error);
    }
};