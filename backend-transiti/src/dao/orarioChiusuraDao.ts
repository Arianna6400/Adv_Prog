import OrarioChiusura from '../models/orarioChiusura';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';
import { OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes } from '../models/orarioChiusura';
import { Transaction } from 'sequelize';

interface OrarioChiusuraDAO extends DAO<OrarioChiusuraAttributes, number> {
    // Metodi specifici per OrarioChiusura, se necessari
}

class OrarioChiusuraDao implements OrarioChiusuraDAO {

    public async getAll(): Promise<OrarioChiusura[]> {
        try {
            return await OrarioChiusura.findAll();
        } catch (error) {
            console.error('Errore nel recupero degli orari di chiusura:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero degli orari di chiusura');
        }
    }

    public async getById(id: number): Promise<OrarioChiusura | null> {
        try {
            const orarioChiusura = await OrarioChiusura.findByPk(id);
            if (!orarioChiusura) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Orario di chiusura con id ${id} non trovato`);
            }
            return orarioChiusura;
        } catch (error) {
            console.error(`Errore nel recupero dell'orario di chiusura con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero dell'orario di chiusura con id ${id}`);
        }
    }

    public async create(data: OrarioChiusuraCreationAttributes, options?: { transaction?: Transaction }): Promise<OrarioChiusura> {
        try {
            return await OrarioChiusura.create(data);
        } catch (error) {
            console.error('Errore nella creazione dell\'orario di chiusura:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'orario di chiusura');
        }
    }

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
            console.error(`Errore nell'aggiornamento dell'orario di chiusura con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'orario di chiusura con id ${id}`);
        }
    }

    public async delete(id: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            const orarioChiusura = await OrarioChiusura.findByPk(id);
            if (!orarioChiusura) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Orario di chiusura con id ${id} non trovato`);
            }
            return await OrarioChiusura.destroy({ where: { id_orario: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione dell'orario di chiusura con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'orario di chiusura con id ${id}`);
        }
    }
}

export default new OrarioChiusuraDao();