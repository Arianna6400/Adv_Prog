import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import { Transaction, FindOptions } from 'sequelize';

// Interfaccia MultaDAO che estende la DAO per includere metodi specifici per Multa
interface MultaDAO extends DAO<MultaAttributes, number> {
    // getMulteByUtente(utenteId: number): Promise<Multa[]>;
}

// Classe MultaDao che implementa l'interfaccia MultaDAO
class MultaDao implements MultaDAO {
    /**
     * Recupera tutte le multe.
     * 
     * @returns {Promise<Multa[]>} Una Promise che risolve un array di multe.
     */
    public async getAll(): Promise<Multa[]> {
        try {
            return await Multa.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle multe');
        }
    }

    /**
     * Recupera una multa per ID.
     * 
     * @param {number} uuid uuid della multa da cercare
     * @returns {Promise<Multa | null>} Una Promise che risolve una multa o null se non trovata.
     */
    public async getById(id: number): Promise<Multa | null> {
        try {
          const multa = await Multa.findByPk(id);
          if (!multa) {
            throw ErrorFactory.createError(ErrorTypes.NotFound, `Multa con id ${id} non trovata`);
          }
          return multa;
        } catch (error) {
          if (error instanceof HttpError) {
            throw error; // Rilancia l'errore personalizzato
          }
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della multa con id ${id}`);
        }
    }

    /**
     * Metodo per ottenere la multa dato il suo UUID
     */
    public async getMultaByUUID(uuid: string, options?: FindOptions): Promise<Multa | null> {
        try {
            // Ricerca la multa nel db tramite UUID
            const multa = await Multa.findOne({ where: { uuid_pagamento: uuid }, ...options });
            if (!multa) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Multa con uuid ${uuid} non trovata`);
            }
            return multa;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della multa con uuid ${uuid}`);
        }
    }

    /**
     * Crea una nuova multa.
     * 
     * @param {MultaCreationAttributes} data I dati per creare la multa.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<Multa>} Una Promise che risolve la multa creata.
     */
    public async create(data: MultaCreationAttributes, options?: { transaction?: Transaction }): Promise<Multa> {
        try {
            return await Multa.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della multa');
        }
    }

    /**
     * Aggiorna una multa esistente.
     * 
     * @param {number} id  L'ID della multa.
     * @param {Partial<MultaAttributes>} data  I dati per aggiornare la multa.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, Multa[]]>} Una promessa che risolve il numero di righe aggiornate e l'array delle multe aggiornate.
     */
    public async update(id: number, data: Partial<MultaAttributes>, options?: { transaction?: Transaction }): Promise<[number, Multa[]]> {
        try {
            const [affectedCount] = await Multa.update(data, { where: { id_multa: id }, returning: true });
            const updatedItems = await Multa.findAll({ where: { id_multa: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento della multa con id ${id}`);
        }
    }

    /**
     * Cancella una multa per ID.
     * 
     * @param {number} id L'ID della multa.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una promessa che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await Multa.destroy({ where: { id_multa: id } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della multa con id ${id}`);
        }
    }
}

export default new MultaDao();
