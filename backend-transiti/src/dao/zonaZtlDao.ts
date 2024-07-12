import ZonaZtl from '../models/zonaZtl';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { ZonaZtlAttributes, ZonaZtlCreationAttributes } from '../models/zonaZtl';
import { Transaction } from 'sequelize';

// Interfaccia ZonaZtlDAO che estende la DAO per includere metodi specifici per ZonaZtl
interface ZonaZtlDAO extends DAO<ZonaZtlAttributes, number> {
    // Metodi specifici per ZonaZtl, se necessari
}

// Classe ZonaZtlDao che implementa l'interfaccia ZonaZtlDAO
class ZonaZtlDao implements ZonaZtlDAO {
    /**
     * Recupera tutte le zone ZTL.
     * 
     * @returns {Promise<ZonaZtl[]>} Una Promise che risolve un array di zone ZTL.
     */
    public async getAll(): Promise<ZonaZtl[]> {
        try {
            return await ZonaZtl.findAll();
        } catch (error) {
            console.error('Errore nel recupero delle zone ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle zone ZTL');
        }
    }

    /**
     * Recupera una zona ZTL per ID.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @returns {Promise<ZonaZtl | null>} Una Promise che risolve una zona ZTL o null se non trovata.
     */
    public async getById(id: number): Promise<ZonaZtl | null> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            return zonaZtl;
        } catch (error) {
            console.error(`Errore nel recupero della zona ZTL con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della zona ZTL con id ${id}`);
        }
    }

    /**
     * Crea una nuova zona ZTL.
     * 
     * @param {ZonaZtlCreationAttributes} data I dati per creare la zona ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<ZonaZtl>} Una Promise che risolve la zona ZTL creata.
     */
    public async create(data: ZonaZtlCreationAttributes, options?: { transaction?: Transaction }): Promise<ZonaZtl> {
        try {
            return await ZonaZtl.create(data);
        } catch (error) {
            console.error('Errore nella creazione della zona ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della zona ZTL');
        }
    }

    /**
     * Aggiorna una zona ZTL esistente.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @param {Partial<ZonaZtlAttributes>} data I dati per aggiornare la zona ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<[number, ZonaZtl[]]>} Una Promise che risolve il numero di righe aggiornate e l'array delle zone ZTL aggiornate.
     */
    public async update(id: number, data: Partial<ZonaZtlAttributes>, options?: { transaction?: Transaction }): Promise<[number, ZonaZtl[]]> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            const [affectedCount] = await ZonaZtl.update(data, { where: { id_zona: id }, returning: true });
            const updatedItems = await ZonaZtl.findAll({ where: { id_zona: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento della zona ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento della zona ZTL con id ${id}`);
        }
    }

    /**
     * Cancella una zona ZTL per ID.
     * 
     * @param {number} id L'ID della zona ZTL.
     * @param {Object} [options] Opzioni aggiuntive per la transazione.
     * @param {Transaction} [options.transaction] La transazione Sequelize.
     * @returns {Promise<number>} Una promessa che risolve il numero di righe cancellate.
     */
    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const zonaZtl = await ZonaZtl.findByPk(id);
            if (!zonaZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Zona ZTL con id ${id} non trovata`);
            }
            return await ZonaZtl.destroy({ where: { id_zona: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione della zona ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della zona ZTL con id ${id}`);
        }
    }
}

export default new ZonaZtlDao();