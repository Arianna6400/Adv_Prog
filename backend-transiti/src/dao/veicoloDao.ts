import Veicolo from '../models/veicolo';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { VeicoloAttributes, VeicoloCreationAttributes } from '../models/veicolo';
import { Transaction } from 'sequelize';

// Interfaccia VeicoloDAO che estende la DAO per includere metodi specifici per Veicolo
interface VeicoloDAO extends DAO<VeicoloAttributes, string> {
    // Metodi specifici per Veicolo, se necessari
}

// Classe VeicoloDao che implementa l'interfaccia VeicoloDAO
class VeicoloDao implements VeicoloDAO {
    
    /**
     * Recupera tutti i veicoli.
     * 
     * @returns {Promise<Veicolo[]>} Una Promise che risolve un array di veicoli.
     */
    public async getAll(): Promise<Veicolo[]> {
        try {
            return await Veicolo.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei veicoli');
        }
    }

    /**
     * Recupera un veicolo per targa.
     * 
     * @param {string} targa La targa del veicolo.
     * @returns {Promise<Veicolo | null>} Una Promise che risolve un veicolo o null se non trovato.
     */
    public async getById(targa: string): Promise<Veicolo | null> {
        try {
            const veicolo = await Veicolo.findByPk(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            return veicolo;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del veicolo con targa ${targa}`);
        }
    }

    /**
     * Crea un nuovo veicolo.
     * 
     * @param {VeicoloCreationAttributes} data I dati per creare il veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<Veicolo>} Una Promise che risolve il veicolo creato.
     */
    public async create(data: VeicoloCreationAttributes, options?: { transaction?: Transaction }): Promise<Veicolo> {
        try {
            return await Veicolo.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del veicolo');
        }
    }

    /**
     * Aggiorna un veicolo esistente.
     * 
     * @param {string} targa La targa del veicolo.
     * @param {Partial<VeicoloAttributes>} data I dati per aggiornare il veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, Veicolo[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei veicoli aggiornati.
     */
    public async update(targa: string, data: Partial<VeicoloAttributes>, options?: { transaction?: Transaction }): Promise<[number, Veicolo[]]> {
        try {
            const veicolo = await this.getById(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            const [affectedCount] = await Veicolo.update(data, { where: { targa }, returning: true });
            const updatedItems = await Veicolo.findAll({ where: {targa: targa}});
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del veicolo con targa ${targa}`);
        }
    }

    /**
     * Cancella un veicolo per targa.
     * 
     * @param {string} targa La targa del veicolo.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async delete(targa: string, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const veicolo = await Veicolo.findByPk(targa);
            if (!veicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Veicolo con targa ${targa} non trovato`);
            }
            return await Veicolo.destroy({ where: { targa } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del veicolo con targa ${targa}`);
        }
    }
}

export default new VeicoloDao();