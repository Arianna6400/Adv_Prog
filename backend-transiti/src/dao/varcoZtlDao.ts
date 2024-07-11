import VarcoZtl, { VarcoZtlAttributes, VarcoZtlCreationAttributes } from '../models/varcoZtl';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { Transaction } from 'sequelize';

interface VarcoZtlDAO extends DAO<VarcoZtlAttributes, number> {
    // Metodi specifici per VarcoZtl, se necessari
    countByZonaZtl(zonaZtlId: number, options?: { transaction?: Transaction }): Promise<number>;
}

class VarcoZtlDao implements VarcoZtlDAO {

    public async getAll(): Promise<VarcoZtl[]> {
        try {
            return await VarcoZtl.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei varchi ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei varchi ZTL');
        }
    }

    public async getById(id: number): Promise<VarcoZtl | null> {
        try {
            const varcoZtl = await VarcoZtl.findByPk(id);
            if (!varcoZtl) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Varco ZTL con id ${id} non trovato`);
            }
            return varcoZtl;
        } catch (error) {
            console.error(`Errore nel recupero del varco ZTL con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del varco ZTL con id ${id}`);
        }
    }

    public async create(data: VarcoZtlCreationAttributes, options?: { transaction?: Transaction }): Promise<VarcoZtl> {
        try {
            return await VarcoZtl.create(data, options);
        } catch (error) {
            console.error('Errore nella creazione del varco ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del varco ZTL');
        }
    }

    public async update(id: number, data: Partial<VarcoZtlAttributes>, options?: { transaction?: Transaction }): Promise<[number, VarcoZtl[]]> {
        try {
            const [affectedCount] = await VarcoZtl.update(data, { where: { id_varco: id }, returning: true });
            const updatedItems = await VarcoZtl.findAll({ where: { id_varco: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del varco ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del varco ZTL con id ${id}`);
        }
    }

    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await VarcoZtl.destroy({ where: { id_varco: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del varco ZTL con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del varco ZTL con id ${id}`);
        }
    }

    public async countByZonaZtl(zonaZtlId: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await VarcoZtl.count({ where: { zona_ztl: zonaZtlId }, transaction: options?.transaction });
        } catch (error) {
            console.error('Errore nel conteggio dei riferimenti alla zona ZTL:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel conteggio dei riferimenti alla zona ZTL');
        }
    }
}

export default new VarcoZtlDao();