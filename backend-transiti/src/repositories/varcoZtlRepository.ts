import varcoZtlDao from '../dao/varcoZtlDao';
import VarcoZtl from '../models/varcoZtl';
import { VarcoZtlCreationAttributes, VarcoZtlAttributes } from '../models/varcoZtl';

class VarcoZtlRepository {
    public async getAllVarcoZtl(): Promise<VarcoZtl[]> {
        try {
            return await varcoZtlDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero dei varchi ZTL dal repository:', error);
            throw new Error('Impossibile recuperare i varchi ZTL');
        }
    }

    public async getVarcoZtlById(id: number): Promise<VarcoZtl | null> {
        try {
            return await varcoZtlDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero del varco ZTL con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare il varco ZTL');
        }
    }

    public async createVarcoZtl(data: VarcoZtlCreationAttributes): Promise<VarcoZtl> {
        try {
            return await varcoZtlDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione del varco ZTL nel repository:', error);
            throw new Error('Impossibile creare il varco ZTL');
        }
    }

    public async updateVarcoZtl(id: number, data: Partial<VarcoZtlAttributes>): Promise<[number, VarcoZtl[]]> {
        try {
            return await varcoZtlDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento del varco ZTL con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare il varco ZTL');
        }
    }

    public async deleteVarcoZtl(id: number): Promise<number> {
        try {
            return await varcoZtlDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione del varco ZTL con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare il varco ZTL');
        }
    }
}

export default new VarcoZtlRepository();
