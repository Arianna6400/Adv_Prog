import OrarioChiusura from '../models/orarioChiusura';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes } from '../models/orarioChiusura';
import { Transaction } from 'sequelize';

// Interfaccia OrarioChiusuraDAO che estende la DAO per includere metodi specifici per OrarioChiusura
interface OrarioChiusuraDAO extends DAO<OrarioChiusuraAttributes, number> {
    // Metodi specifici per OrarioChiusura, se necessari
}

// Classe OrarioChiusuraDao che implementa l'interfaccia OrarioChiusuraDAO
class OrarioChiusuraDao implements OrarioChiusuraDAO {
    /**
     * Recupera tutti gli orari di chiusura.
     * 
     * @returns {Promise<OrarioChiusura[]>} Una Promise che risolve un array di orari di chiusura.
     */
    public async getAll(): Promise<OrarioChiusura[]> {
        try {
            return await OrarioChiusura.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli orari di chiusura');
        }
    }

    /**
     * Recupera un orario di chiusura per ID.
     * 
     * @param {number} id L'ID dell'orario di chiusura.
     * @returns {Promise<OrarioChiusura | null>} Una Promise che risolve un orario di chiusura o null se non trovato.
     */
    public async getById(id: number): Promise<OrarioChiusura | null> {
        try {
            const orarioChiusura = await OrarioChiusura.findByPk(id);
            if (!orarioChiusura) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Orario di chiusura con id ${id} non trovato`);
            }
            return orarioChiusura;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'orario di chiusura con id ${id}`);
        }
    }

     /**
     * Crea un nuovo orario di chiusura.
     * 
     * @param {OrarioChiusuraCreationAttributes} data  I dati per creare l'orario di chiusura.
     * @param {Object} [options]  Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<OrarioChiusura>} Una Promise che risolve l'orario di chiusura creato.
     */
    public async create(data: OrarioChiusuraCreationAttributes, options?: { transaction?: Transaction }): Promise<OrarioChiusura> {
        try {
            return await OrarioChiusura.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'orario di chiusura');
        }
    }

    /**
     * Aggiorna un orario di chiusura esistente.
     * 
     * @param {number} id L'ID dell'orario di chiusura.
     * @param {Partial<OrarioChiusuraAttributes>} data I dati per aggiornare l'orario di chiusura.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, OrarioChiusura[]]>} Una Promise che risolve il numero di righe aggiornate e l'array degli orari di chiusura aggiornati.
     */
    public async update(id: number, data: Partial<OrarioChiusuraAttributes>, options?: { transaction?: Transaction }): Promise<[number, OrarioChiusura[]]> {
        try {
            const orarioChiusura = await OrarioChiusura.findByPk(id);
            if (!orarioChiusura) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Orario di chiusura con id ${id} non trovato`);
            }
            const [affectedCount] = await OrarioChiusura.update(data, { where: { id_orario: id }, returning: true });
            const updatedItems = await OrarioChiusura.findAll({ where: { id_orario: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'orario di chiusura con id ${id}`);
        }
    }

    /**
     * Cancella un orario di chiusura per ID.
     * 
     * @param {number} id L'ID dell'orario di chiusura.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const orarioChiusura = await OrarioChiusura.findByPk(id);
            if (!orarioChiusura) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Orario di chiusura con id ${id} non trovato`);
            }
            return await OrarioChiusura.destroy({ where: { id_orario: id } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'orario di chiusura con id ${id}`);
        }
    }
}

export default new OrarioChiusuraDao();