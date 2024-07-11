import { Request, Response, NextFunction } from 'express';
import multaDao from '../dao/multaDao';
import utenteDao from '../dao/utenteDao';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { JwtPayload } from 'jsonwebtoken';
import Database from '../utils/database';

export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.body; // UUID multa passato come parametro
    const { id } = (req as any).user; // id preso nel payload

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

        const utente = await utenteDao.getById(id, { transaction });
        if (!utente) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
        }

        if (Number(utente.token_rimanenti) < multa.importo_token) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Token insufficienti'));
        }

        const newTokens = Number(utente.token_rimanenti) - multa.importo_token;
        utente.token_rimanenti = parseFloat(newTokens.toFixed(2)); // per gestire le cifre decimali se passato come float
        multa.pagata = true;
        
        await utente.save({ transaction });
        await multa.save({ transaction });

        await transaction.commit();

        res.status(200).json({ 
            multa_numero: multa.id_multa,
            esito: 'Pagamento effettuato con successo',
            token_residui: utente.token_rimanenti,
        });
    } catch (error) {
        await transaction.rollback();
        next(ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel pagamento'));
    }
};


export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const tokens  = parseFloat(req.body.tokens.toFixed(2));
    try {
        const utente = await utenteDao.rechargeTokens(id, tokens);
        res.status(200).json({ 
            utente: utente.email,
            message: 'Token ricaricati con successo', 
            nuovo_credito: utente.token_rimanenti,
        });
    } catch (error) {
        next(error);
    }
};

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = (req as any).user as JwtPayload;
        const tokenRimanenti = await utenteDao.checkToken(id);
        res.status(200).json({
            token_rimanenti: tokenRimanenti, 
        });
    } catch (error) {
        next(error);
    }
};