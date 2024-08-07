import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { MultaAttributes } from '../models/multa';
import { FindOptions } from 'sequelize';

interface MultaDAO<T, K> {
    getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null>;
}

class MultaDao implements MultaDAO<MultaAttributes, number> {

    /**
     * Metodo per ottenere la multa dato il suo UUID.
     * 
     * @param {string} uuid L'UUID della multa.
     * @param {FindOptions} [options] Opzioni aggiuntive per la query di ricerca.
     * @returns {Promise<Multa | null>} Una Promise che risolve la multa trovata o null se non trovata.
     */
    public async getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null> {
        try {
            // Ricerca la multa nel database tramite UUID
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