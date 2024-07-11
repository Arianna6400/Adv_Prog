import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import { Transaction, FindOptions } from 'sequelize';

interface MultaDAO<T, K> {
    getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null>;
}

class MultaDao implements MultaDAO<MultaAttributes, number> {

    public async getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null> {
        try {
            const multa = await Multa.findOne({ where: { uuid_pagamento: uuid }, ...options });
            if (!multa) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Multa con uuid ${uuid} non trovata`);
            }
            return multa;
        } catch (error) {
            console.error(`Errore nel recupero della multa con uuid ${uuid}:`, error);
            if (error instanceof HttpError) {
                throw error;
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della multa con uuid ${uuid}`);
        }
    }

}

export default new MultaDao();