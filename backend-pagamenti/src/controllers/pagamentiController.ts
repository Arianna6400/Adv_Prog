import { Request, Response, NextFunction } from 'express';
import multaDao from '../dao/multaDao';
import utenteDao from '../dao/utenteDao';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { JwtPayload } from 'jsonwebtoken';
import Database from '../utils/database';
import { StatusCodes } from 'http-status-codes';

/**
 * Funzione per pagare una multa.
 */
export const payMulta = async (req: Request, res: Response, next: NextFunction) => {
    const { uuid } = req.body; // UUID multa passato come parametro
    const { id } = (req as any).user; // id preso nel payload

    const sequelize = Database.getInstance();
    const transaction = await sequelize.transaction(); // Inizia una nuova transazione

    try {
        // Cerca la multa
        const multa = await multaDao.getMultaByUUID(uuid, { transaction });
        if (!multa) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Multa non trovata'));
        }

        if (multa.pagata) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Multa già pagata'));
        }
        // Cerca l'utente
        const utente = await utenteDao.getById(id, { transaction });
        if (!utente) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato'));
        }
        // Verifica se l'utente ha abbastanza token per pagare la multa
        if (Number(utente.token_rimanenti) < multa.importo_token) {
            await transaction.rollback();
            return next(ErrorFactory.createError(ErrorTypes.BadRequest, 'Token insufficienti'));
        }
        // Calcola il nuovo saldo dopo il pagamento
        const newTokens = Number(utente.token_rimanenti) - multa.importo_token;
        utente.token_rimanenti = Number(newTokens); // Per gestire le cifre decimali se passato come float
        multa.pagata = true;
        
        await utente.save({ transaction });
        await multa.save({ transaction });

        await transaction.commit(); // Termina la transazione con successo

        res.status(StatusCodes.OK).json({ 
            multa: multa,
            esito: `Pagamento effettuato con successo da ${utente.email}`,
            token_rimanenti: utente.token_rimanenti,
        });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

/**
 * Funzione per ricaricare i token di un utente.
 */
export const rechargeTokens = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id); // ID dell'utente passato nel body della richiesta
    const tokens  = Number(req.body.tokens);
    try {
        const utente = await utenteDao.rechargeTokens(id, tokens);
        res.status(StatusCodes.OK).json({ 
            info: 'Token ricaricati con successo', 
            utente: utente,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Funzione per verificare i token rimanenti di un utente.
 */
export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = (req as any).user as JwtPayload; // ID dell'utente preso dal payload del token JWT
        const tokenRimanenti = await utenteDao.getById(id);
        res.status(StatusCodes.OK).json({
            utente: tokenRimanenti?.email,
            token_rimanenti: Number(tokenRimanenti?.token_rimanenti)
        });
    } catch (error) {
        next(error);
    }
};