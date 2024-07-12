import varcoZtlDao from '../dao/varcoZtlDao';
import UtenteDao from '../dao/utenteDao';
import IsVarcoDao from '../dao/isVarcoDao';
import VarcoZtl from '../models/varcoZtl';
import { UtenteCreationAttributes } from '../models/utente';
import { VarcoZtlCreationAttributes, VarcoZtlAttributes } from '../models/varcoZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import Database from '../utils/database';
/**
 * Classe VarcoZtlRepository per gestire le operazioni CRUD sui varchi ZTL.
 */
class VarcoZtlRepository {
    /**
     * Recupera tutti i varchi ZTL.
     * 
     * @returns {Promise<VarcoZtl[]>} Una Promise che risolve un array di varchi ZTL.
     */
    public async getAllVarcoZtl(): Promise<VarcoZtl[]> {
        try {
            return await varcoZtlDao.getAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare i varchi ZTL');
        }
    }

    /**
     * Recupera un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL. 
     * @returns {Promise<VarcoZtl | null>} Una Promise che risolve un varco ZTL o null se non trovato.
     */
    public async getVarcoZtlById(id: number): Promise<VarcoZtl | null> {
        try {
            return await varcoZtlDao.getById(id);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare il varco ZTL');
        }
    }

    /**
     * Crea un nuovo varco ZTL.
     * 
     * @param {VarcoZtlCreationAttributes} data I dati per creare il varco ZTL. 
     * @returns {Promise<VarcoZtl>} Una Promise che risolve il varco ZTL creato.
     */
    public async createVarcoZtl(data: VarcoZtlCreationAttributes): Promise<VarcoZtl> {
        const sequelize = Database.getInstance();
        const transaction = await sequelize.transaction();

        try {
            // Crea il varco ZTL
            const varcoZtl = await varcoZtlDao.create(data, { transaction });

            // Crea un nuovo utente con nome e cognome vuoti
            const utenteData: UtenteCreationAttributes = {
                nome: '',
                cognome: '',
                email: `varco_${varcoZtl.id_varco}@example.com`,
                ruolo: 'varco',
                token_rimanenti: 0,
            };

            const utente = await UtenteDao.create(utenteData, { transaction });

            // Crea l'associazione nella tabella is_varco
            const isVarcoData = {
                id_utente: utente.id_utente,
                id_varco: varcoZtl.id_varco,
            };

            // Aggiunge l'associazione al database
            await IsVarcoDao.create(isVarcoData, { transaction });

            // Conferma la transazione
            await transaction.commit();
            return varcoZtl;
        } catch (error) {
            // Annulla la transazione in caso di errore
            await transaction.rollback();
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
        }
    }

    /**
     * Aggiorna un varco ZTL esistente.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @param {Partial<VarcoZtlAttributes>} data I dati per aggiornare il varco ZTL.
     * @returns {Promise<[number, VarcoZtl[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei varchi ZTL aggiornati.
     */
    public async updateVarcoZtl(id: number, data: Partial<VarcoZtlAttributes>): Promise<[number, VarcoZtl[]]> {
        try {
            return await varcoZtlDao.update(id, data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile aggiornare il varco ZTL');
        }
    }

    /**
     * Cancella un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async deleteVarcoZtl(id: number): Promise<number> {
        try {
            return await varcoZtlDao.delete(id);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile cancellare il varco ZTL');
        }
    }
}

export default new VarcoZtlRepository();