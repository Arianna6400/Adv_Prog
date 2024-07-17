import Transito from '../models/transito';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';
import { Transaction } from 'sequelize';

// Interfaccia TransitoDAO che estende la DAO per includere metodi specifici per Transito
interface TransitoDAO extends DAO<TransitoAttributes, number> {
    // Metodi specifici per TransitoDAO, se necessari
}

// Classe TransitoDao che implementa l'interfaccia TransitoDAO
class TransitoDao implements TransitoDAO {
    /**
     * Recupera tutti i transiti.
     * 
     * @returns {Promise<Transito[]>} Una Promise che risolve un array di transiti.
     */
    public async getAll(): Promise<Transito[]> {
        try {
            return await Transito.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei transiti');
        }
    }

    /**
     * Recupera un transito per ID.
     * 
     * @param {number} id L'ID del transito.
     * @returns {Promise<Transito | null>} Una Promise che risolve un transito o null se non trovato.
     */
    public async getById(id: number): Promise<Transito | null> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            return transito;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del transito con id ${id}`);
        }
    }

    /**
     * Crea un nuovo transito.
     * 
     * @param {TransitoCreationAttributes} data I dati per creare il transito.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<Transito>} Una Promise che risolve il transito creato.
     */
    public async create(data: TransitoCreationAttributes, options?: { transaction?: Transaction }): Promise<Transito> {
        try {
            return await Transito.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del transito');
        }
    }

    /**
     * Aggiorna un transito esistente.
     * 
     * @param {number} id L'ID del transito.
     * @param {Partial<TransitoAttributes>} data I dati per aggiornare il transito.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, Transito[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei transiti aggiornati.
     */
    public async update(id: number, data: Partial<TransitoAttributes>, options?: { transaction?: Transaction }): Promise<[number, Transito[]]> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            const [affectedCount] = await Transito.update(data, { where: { id_transito: id }, returning: true });
            const updatedItems = await Transito.findAll({ where: { id_transito: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del transito con id ${id}`);
        }
    }

     /**
     * Cancella un transito per ID.
     * 
     * @param {number} id L'ID del transito.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const transito = await Transito.findByPk(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Transito con id ${id} non trovato`);
            }
            return await Transito.destroy({ where: { id_transito: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del transito con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del transito con id ${id}`);
        }
    }
}

export default new TransitoDao();