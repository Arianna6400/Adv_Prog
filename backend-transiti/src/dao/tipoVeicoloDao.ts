import TipoVeicolo from '../models/tipoVeicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { TipoVeicoloAttributes, TipoVeicoloCreationAttributes } from '../models/tipoVeicolo';
import { Transaction } from 'sequelize';

// Interfaccia TipoVeicoloDAO che estende la DAO per includere metodi specifici per TipoVeicolo
interface TipoVeicoloDAO extends DAO<TipoVeicoloAttributes, number> {
    // Metodi specifici per TipoVeicolo, se necessari
}

// Classe TipoVeicoloDao che implementa l'interfaccia TipoVeicoloDAO
class TipoVeicoloDao implements TipoVeicoloDAO {

    /**
     * Recupera tutti i tipi di veicolo.
     * 
     * @returns {Promise<TipoVeicolo[]>} Una Promise che risolve un array di tipi di veicolo.
     */
    public async getAll(): Promise<TipoVeicolo[]> {
        try {
            return await TipoVeicolo.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei tipi di veicolo');
        }
    }

    /**
     * Recupera un tipo di veicolo per ID.
     * 
     * @param {number} id L'ID del tipo di veicolo.
     * @returns {Promise<TipoVeicolo | null>} Una Promise che risolve un tipo di veicolo o null se non trovato.
     */
    public async getById(id: number): Promise<TipoVeicolo | null> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            return tipoVeicolo;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del tipo di veicolo con id ${id}`);
        }
    }

    /**
     * Crea un nuovo tipo di veicolo.
     * 
     * @param {TipoVeicoloCreationAttributes} data I dati per creare il tipo di veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<TipoVeicolo>} Una Promise che risolve il tipo di veicolo creato.
     */
    public async create(data: TipoVeicoloCreationAttributes, options?: { transaction?: Transaction }): Promise<TipoVeicolo> {
        try {
            return await TipoVeicolo.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del tipo di veicolo');
        }
    }
    /**
     * Aggiorna un tipo di veicolo esistente.
     * 
     * @param {number} id L'ID del tipo di veicolo.
     * @param {Partial<TipoVeicoloAttributes>} data I dati per aggiornare il tipo di veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, TipoVeicolo[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei tipi di veicolo aggiornati.
     */
    public async update(id: number, data: Partial<TipoVeicoloAttributes>, options?: { transaction?: Transaction }): Promise<[number, TipoVeicolo[]]> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            const [affectedCount] = await TipoVeicolo.update(data, { where: { id_tipo_veicolo: id }, returning: true });
            const updatedItems = await TipoVeicolo.findAll({ where: { id_tipo_veicolo: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del tipo di veicolo con id ${id}`);
        }
    }

    /**
     * Cancella un tipo di veicolo per ID.
     * 
     * @param {number} id L'ID del tipo di veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una promessa che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            return await TipoVeicolo.destroy({ where: { id_tipo_veicolo: id } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del tipo di veicolo con id ${id}`);
        }
    }
}

export default new TipoVeicoloDao();