import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import { Transaction, FindOptions } from 'sequelize';

interface MultaDAO<T, K> {
    getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null>;
}

class MultaDao implements MultaDAO<MultaAttributes, number> {

    /**
     * Metodo per ottenere la multa dato il suo UUID
     */
    public async getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null> {
        try {
            // ricerca la multa nel db tramite UUID
            const multa = await Multa.findOne({ where: { uuid_pagamento: uuid }, ...options });
            if (!multa) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Multa con uuid ${uuid} non trovata`);
            }
            return multa;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della multa con uuid ${uuid}`);
        }
    }

}

export default new MultaDao();