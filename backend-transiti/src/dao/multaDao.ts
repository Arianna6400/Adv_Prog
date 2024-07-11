import Multa from '../models/multa';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import { Transaction } from 'sequelize';

interface MultaDAO extends DAO<MultaAttributes, number> {
    // getMulteByUtente(utenteId: number): Promise<Multa[]>;
}

class MultaDao implements MultaDAO {
    
    public async getAll(): Promise<Multa[]> {
        try {
            return await Multa.findAll();
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle multe');
        }
    }

    public async getById(id: number): Promise<Multa | null> {
        try {
          const multa = await Multa.findByPk(id);
          if (!multa) {
            throw ErrorFactory.createError(ErrorTypes.NotFound, `Multa con id ${id} non trovata`);
          }
          return multa;
        } catch (error) {
          if (error instanceof HttpError) {
            throw error; // Rilancia l'errore personalizzato
          }
          throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero della multa con id ${id}`);
        }
    }

    public async create(data: MultaCreationAttributes, options?: { transaction?: Transaction }): Promise<Multa> {
        try {
            return await Multa.create(data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione della multa');
        }
    }

    public async update(id: number, data: Partial<MultaAttributes>, options?: { transaction?: Transaction }): Promise<[number, Multa[]]> {
        try {
            const [affectedCount] = await Multa.update(data, { where: { id_multa: id }, returning: true });
            const updatedItems = await Multa.findAll({ where: { id_multa: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento della multa con id ${id}`);
        }
    }

    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await Multa.destroy({ where: { id_multa: id } });
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione della multa con id ${id}`);
        }
    }
}

export default new MultaDao();
