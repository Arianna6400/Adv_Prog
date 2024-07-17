import varcoZtlDao from '../dao/varcoZtlDao';
import UtenteDao from '../dao/utenteDao';
import IsVarcoDao from '../dao/isVarcoDao';
import zonaZtlDao from '../dao/zonaZtlDao';
import orarioChiusuraDao from '../dao/orarioChiusuraDao';
import VarcoZtl from '../models/varcoZtl';
import { UtenteCreationAttributes } from '../models/utente';
import { VarcoZtlCreationAttributes, VarcoZtlAttributes } from '../models/varcoZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import Database from '../utils/database';
import transitoDao from '../dao/transitoDao';
import veicoloDao from '../dao/veicoloDao';

/**
 * Classe VarcoZtlRepository per gestire le operazioni CRUD sui varchi ZTL.
 */
class VarcoZtlRepository {
    /**
     * Recupera tutti i varchi ZTL.
     * 
     * @returns {Promise<any[]>} Una Promise che risolve un array di più Promise combinate.
     */
    public async getAllVarcoZtl(): Promise<any[]> {
        try {
            const varchiZtl = await varcoZtlDao.getAll();
            // arricchisco le info di stampa del varco
            return await Promise.all(varchiZtl.map(varco => this._enrichVarcoZtl(varco)));
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare i varchi ZTL');
        }
    }

    /**
     * Recupera un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL. 
     * @returns {Promise<VarcoZtl | null>} Una Promise che risolve più Promise combinate o null se non trovato.
     */
    public async getVarcoZtlById(id: number): Promise<any | null> {
        try {
            const varcoZtl = await varcoZtlDao.getById(id);
            if (!varcoZtl) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare il varco ZTL con id ${id}`);
            }
            // arricchiesco le info di stampa del varcco
            return await this._enrichVarcoZtl(varcoZtl);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare il varco ZTL con id ${id}`);
        }
    }

    /**
     * Recupera un varco ZTL per ID con tutti i transiti associati.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @returns {Promise<any | null>} Una Promise che risolve il varco ZTL con i transiti associati o null se non trovato.
     */
    public async getVarcoZtlWithTransiti(id: number): Promise<any | null> {
        try {
            const varcoZtl = await varcoZtlDao.getById(id);
            if (!varcoZtl) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare il varco ZTL con id ${id}`);
            }
            // arricchisco le info di stampa del varco con i transiti in esso
            const enrichedVarco = await this._enrichVarcoZtl(varcoZtl);
            enrichedVarco.transiti = await this._getTransitiWithDetails(id);
            return enrichedVarco;
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare il varco ZTL con id ${id}`);
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
            if(! varcoZtl){
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
            }

            // Crea un nuovo utente con nome e cognome vuoti
            const utenteData: UtenteCreationAttributes = {
                nome: '',
                cognome: '',
                email: `varco_${varcoZtl.id_varco}@example.com`,
                ruolo: 'varco',
                token_rimanenti: 0,
            };
            const utente = await UtenteDao.create(utenteData, { transaction });
            if (!utente){
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
            }
            
            // Crea l'associazione nella tabella is_varco
            const isVarcoData = {
                id_utente: utente.id_utente,
                id_varco: varcoZtl.id_varco,
            };

            // Aggiunge l'associazione al database
            const isVarco = await IsVarcoDao.create(isVarcoData, { transaction });
            if(!isVarco){
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'associazione');
            }
            
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
            // Verifica l'esistenza del varco
            const varco = await varcoZtlDao.getById(id);
            if(!varco){
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Varco con id ${id} non trovato`);
            }
            return await varcoZtlDao.update(id, data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile aggiornare il varco ZTL con id ${id}`);
        }
    }

    /**
     * Cancella un varco ZTL per ID.
     * 
     * @param {number} id L'ID del varco ZTL.
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async deleteVarcoZtl(id: number): Promise<number> {

        // Verifica come prima cosac he non ci siano transiti associati
        const transitoAssociato = (await transitoDao.getAll()).find(transito => transito.varco === id);
        if (transitoAssociato) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile eliminare il varco con id ${id}, poichè associato ad un transito`);
        }

        const sequelize = Database.getInstance();
        const transaction = await sequelize.transaction();
    
        try {
            // Verifica l'esistenza del varco ZTL
            const varcoZtl = await varcoZtlDao.getById(id);
            if (!varcoZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, 'Varco ZTL non trovato');
            }

            // Recupera tutte le relazioni nella tabella is_varco e trova quella corrispondente
            const isVarco = (await IsVarcoDao.getAll()).find(iv => iv.id_varco === id);
            if (!isVarco) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, 'Relazione is_varco non trovata');
            }

            // Verifica l'esistenza dell'utente
            const utente = await UtenteDao.getById(isVarco.id_utente);
            if (!utente) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, 'Utente non trovato');
            }

            // Elimina la relazione nella tabella is_varco
            await IsVarcoDao.delete(isVarco.id_utente, { transaction });
            // Elimina l'utente corrispondente nella tabella utente
            await UtenteDao.delete(isVarco.id_utente, { transaction });
            // Elimina il varco ZTL nella tabella varcoZtl
            const deletedVarco = await varcoZtlDao.delete(id, { transaction });
    
            // Esegui il commit della transazione
            await transaction.commit();
            return deletedVarco;
        } catch (error) {
            // Annulla la transazione in caso di errore
            await transaction.rollback();
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile cancellare il varco ZTL con id ${id}`);
        }
    }

    // HELPER PRIVATI

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {VarcoZtl} varcoZtl Il varco per il quale stampare le informazioni.
     * @returns {Promise<any[]>} Una Promise che risolve più array di Promise.
     */
    private async _enrichVarcoZtl(varcoZtl: VarcoZtl): Promise<any> {
        const zonaZtl = await zonaZtlDao.getById(varcoZtl.zona_ztl);
        const orarioChiusura = await orarioChiusuraDao.getById(varcoZtl.orario_chiusura);
        return {
            ...varcoZtl.dataValues,
            zona_ztl: zonaZtl ? zonaZtl.dataValues : null,
            orario_chiusura: orarioChiusura ? orarioChiusura.dataValues : null
        };
    }

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {number} varcoId L'ID del varco per cui stampare le informazioni.
     * @returns {Promise<any[]>} Una Promise che risolve più array di Promise.
     */
    private async _getTransitiWithDetails(varcoId: number): Promise<any[]> {
        const transiti = (await transitoDao.getAll()).filter(transito => transito.varco === varcoId);
        return await Promise.all(transiti.map(async transito => {
            const veicolo = await veicoloDao.getById(transito.veicolo);
            return {
                ...transito.dataValues,
                id_transito: undefined,
                varco: undefined,
                veicolo: veicolo ? veicolo.dataValues : null,
            };
        }));
    }
}

export default new VarcoZtlRepository();