import IsVarco, { IsVarcoAttributes } from '../models/isVarco';
import { Transaction } from 'sequelize';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';

// Interfaccia IsVarcoDAO che estende la DAO per includere metodi specifici per IsVarco
interface IsVarcoDAO extends DAO<IsVarcoAttributes, number> {
    // Metodi specifici per IsVarco, se necessari
}

// Classe IsVarcoDao che implementa l'interfaccia IsVarcoDAO
class IsVarcoDao implements IsVarcoDAO {
    /**
     * Recupera tutte le associazioni IsVarco.
     * 
     * @returns {Promise<IsVarco[]>} Una Promise che risolve un array di associazioni IsVarco.
     */
    public async getAll(): Promise<IsVarco[]> {
        try {
            return await IsVarco.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle associazioni is_varco');
        }
    }

    /**
     * Recupera un'associazione IsVarco per ID utente.
     * 
     * @param {number} id_utente L'ID dell'utente.
     * @returns {Promise<IsVarco | null>} Una Promise che risolve un'associazione IsVarco o null se non trovata.
     */
    public async getById(id_utente: number): Promise<IsVarco | null> {
        try {
            const isVarco = await IsVarco.findOne({ where: { id_utente } });
            if (!isVarco) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Associazione is_varco non trovata`);
            }
            return isVarco;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'associazione is_varco');
        }
    }

    /**
     * Crea una nuova associazione IsVarco.
     * 
     * @param {IsVarcoAttributes} data I dati per creare l'associazione IsVarco.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<IsVarco>} Una Promise che risolve l'associazione IsVarco creata.
     */
    public async create(data: IsVarcoAttributes, options?: { transaction?: Transaction }): Promise<IsVarco> {
        try {
            return await IsVarco.create(data, options);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'associazione is_varco');
        }
    }

    /**
     * Aggiorna un'associazione IsVarco esistente.
     * 
     * @param {number} id_utente L'ID dell'utente.
     * @param {Partial<IsVarcoAttributes>} data I dati per aggiornare l'associazione IsVarco.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, IsVarco[]]>} Una Promise che risolve il numero di righe aggiornate e l'array delle associazioni IsVarco aggiornate.
     */
    public async update(id_utente: number, data: Partial<IsVarcoAttributes>, options?: { transaction?: Transaction }): Promise<[number, IsVarco[]]> {
        try {
            const [affectedCount] = await IsVarco.update(data, { where: { id_utente }, ...options });
            const updatedItems = await IsVarco.findAll({ where: { id_utente }, ...options });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'associazione is_varco per id ${id_utente}`);
        }
    }

    /**
     * Cancella un'associazione IsVarco per ID utente.
     * 
     * @param {number} id_utente L'ID dell'utente.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async delete(id_utente: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await IsVarco.destroy({ where: { id_utente }, ...options });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'associazione is_varco per id ${id_utente}`);
        }
    }

}

export default new IsVarcoDao();