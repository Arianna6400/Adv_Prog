import VarcoZtl from '../models/varcoZtl';
import { HttpError } from '../middleware/errorHandlerMiddleware';
import { DAO } from './daoInterface';
import { VarcoZtlAttributes, VarcoZtlCreationAttributes } from '../models/varcoZtl';

interface VarcoZtlDAO extends DAO<VarcoZtlAttributes, number> {
    // Metodi specifici per VarcoZtl, se necessari
}

class VarcoZtlDao implements VarcoZtlDAO {
    public async getAll(): Promise<VarcoZtl[]> {
        try {
            return await VarcoZtl.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei varchi ZTL:', error);
            throw new HttpError(500, 'Errore nel recupero dei varchi ZTL');
        }
    }

    public async getById(id: number): Promise<VarcoZtl | null> {
        try {
            return await VarcoZtl.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero del varco ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero del varco ZTL con id ${id}`);
        }
    }

    public async create(data: VarcoZtlCreationAttributes): Promise<VarcoZtl> {
        try {
            return await VarcoZtl.create(data);
        } catch (error) {
            console.error('Errore nella creazione del varco ZTL:', error);
            throw new HttpError(500, 'Errore nella creazione del varco ZTL');
        }
    }

    public async update(id: number, data: Partial<VarcoZtlAttributes>): Promise<[number, VarcoZtl[]]> {
        try {
            const [affectedCount] = await VarcoZtl.update(data, { where: { id_varco: id }, returning: true });
            const updatedItems = await VarcoZtl.findAll({ where: { id_varco: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del varco ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento del varco ZTL con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await VarcoZtl.destroy({ where: { id_varco: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del varco ZTL con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione del varco ZTL con id ${id}`);
        }
    }
}

export default new VarcoZtlDao();
