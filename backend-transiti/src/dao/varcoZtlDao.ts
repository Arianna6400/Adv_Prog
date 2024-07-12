import VarcoZtl, { VarcoZtlAttributes, VarcoZtlCreationAttributes } from '../models/varcoZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { Transaction } from 'sequelize';

// Interfaccia VarcoZtlDAO che estende la DAO per includere metodi specifici per VarcoZtl
interface VarcoZtlDAO extends DAO<VarcoZtlAttributes, number> {
    // Metodi specifici per VarcoZtl, se necessari
}

// Classe VarcoZtlDao che implementa l'interfaccia VarcoZtlDao
class VarcoZtlDao implements VarcoZtlDAO {

    /**
     * Recupera tutti i varchi ZTL.
     * 
     * @returns {Promise<VarcoZtl[]>} Una Promise che risolve un array di varchi ZTL.
     */
    public async getAll(): Promise<VarcoZtl[]> {
        try {
            return await VarcoZtl.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei varchi ZTL');
        }
    }

    /**
     * Recupera un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @returns {Promise<VarcoZtl | null>} Una Promise che risolve un varco ZTL o null se non trovato.
     */
    public async getById(id: number): Promise<VarcoZtl | null> {
        try {
            const varcoZtl = await VarcoZtl.findByPk(id);
            if (!varcoZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Varco ZTL con id ${id} non trovato`);
            }
            return varcoZtl;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del varco ZTL con id ${id}`);
        }
    }

    /**
     * Crea un nuovo varco ZTL.
     * 
     * @param {VarcoZtlCreationAttributes} data I dati per creare il varco ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<VarcoZtl>} Una Promise che risolve il varco ZTL creato.
     */
    public async create(data: VarcoZtlCreationAttributes, options?: { transaction?: Transaction }): Promise<VarcoZtl> {
        try {
            return await VarcoZtl.create(data, options);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
        }
    }

    /**
     * Aggiorna un varco ZTL esistente.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @param {Partial<VarcoZtlAttributes>} data I dati per aggiornare il varco ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, VarcoZtl[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei varchi ZTL aggiornati.
     */
    public async update(id: number, data: Partial<VarcoZtlAttributes>, options?: { transaction?: Transaction }): Promise<[number, VarcoZtl[]]> {
        try {
            const [affectedCount] = await VarcoZtl.update(data, { where: { id_varco: id }, returning: true });
            const updatedItems = await VarcoZtl.findAll({ where: { id_varco: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del varco ZTL con id ${id}`);
        }
    }

    /**
     * Cancella un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una promessa che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await VarcoZtl.destroy({ where: { id_varco: id } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del varco ZTL con id ${id}`);
        }
    }
}

export default new VarcoZtlDao();