import IsVarco, { IsVarcoAttributes } from '../models/isVarco';
import { Transaction } from 'sequelize';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
import { DAO } from './daoInterface';

interface IsVarcoDAO extends DAO<IsVarcoAttributes, number> {
    // Metodi specifici per IsVarco, se necessari
}

class IsVarcoDao implements IsVarcoDAO {
    
    public async getAll(): Promise<IsVarco[]> {
        try {
            return await IsVarco.findAll();
        } catch (error) {
            console.error('Errore nel recupero delle associazioni is_varco:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero delle associazioni is_varco');
        }
    }

    public async getById(id_utente: number): Promise<IsVarco | null> {
        try {
            const isVarco = await IsVarco.findOne({ where: { id_utente } });
            if (!isVarco) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Associazione is_varco non trovata`);
            }
            return isVarco;
        } catch (error) {
            console.error('Errore nel recupero dell\'associazione is_varco:', error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dell\'associazione is_varco');
        }
    }

    public async create(data: IsVarcoAttributes, options?: { transaction?: Transaction }): Promise<IsVarco> {
        try {
            return await IsVarco.create(data, options);
        } catch (error) {
            console.error('Errore nella creazione dell\'associazione is_varco:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione dell\'associazione is_varco');
        }
    }

    public async update(id_utente: number, data: Partial<IsVarcoAttributes>, options?: { transaction?: Transaction }): Promise<[number, IsVarco[]]> {
        try {
            const [affectedCount] = await IsVarco.update(data, { where: { id_utente }, ...options });
            const updatedItems = await IsVarco.findAll({ where: { id_utente }, ...options });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento dell'associazione is_varco per id ${id_utente}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento dell'associazione is_varco per id ${id_utente}`);
        }
    }

    public async delete(id_utente: number, options?: { transaction?: Transaction }): Promise<number> {
        try {
            return await IsVarco.destroy({ where: { id_utente }, ...options });
        } catch (error) {
            console.error(`Errore nella cancellazione dell'associazione is_varco per id ${id_utente}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione dell'associazione is_varco per id ${id_utente}`);
        }
    }

}

export default new IsVarcoDao();