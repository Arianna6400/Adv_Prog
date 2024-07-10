import varcoZtlDao from '../dao/varcoZtlDao';
import UtenteDao from '../dao/utenteDao';
import IsVarcoDao from '../dao/isVarcoDao';
import VarcoZtl from '../models/varcoZtl';
import { UtenteCreationAttributes } from '../models/utente';
import { VarcoZtlCreationAttributes, VarcoZtlAttributes } from '../models/varcoZtl';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';
import Database from '../utils/database';

class VarcoZtlRepository {
    
    public async getAllVarcoZtl(): Promise<VarcoZtl[]> {
        try {
            return await varcoZtlDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero dei varchi ZTL dal repository:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare i varchi ZTL');
        }
    }

    public async getVarcoZtlById(id: number): Promise<VarcoZtl | null> {
        try {
            return await varcoZtlDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero del varco ZTL con id ${id} dal repository:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare il varco ZTL');
        }
    }

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

            await IsVarcoDao.create(isVarcoData, { transaction });

            await transaction.commit();
            return varcoZtl;
        } catch (error) {
            await transaction.rollback();
            console.error('Errore nella creazione del varco ZTL nel repository:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
        }
    }

    public async updateVarcoZtl(id: number, data: Partial<VarcoZtlAttributes>): Promise<[number, VarcoZtl[]]> {
        try {
            return await varcoZtlDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento del varco ZTL con id ${id} nel repository:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile aggiornare il varco ZTL');
        }
    }

    public async deleteVarcoZtl(id: number): Promise<number> {
        try {
            return await varcoZtlDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione del varco ZTL con id ${id} nel repository:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile cancellare il varco ZTL');
        }
    }
}

export default new VarcoZtlRepository();