import TipoVeicolo from '../models/tipoVeicolo';
import { HttpError } from '../middleware/errorHandlerMiddleware';
import { DAO } from './daoInterface';
import { TipoVeicoloAttributes, TipoVeicoloCreationAttributes } from '../models/tipoVeicolo';

interface TipoVeicoloDAO extends DAO<TipoVeicoloAttributes, number> {
    // Metodi specifici per TipoVeicolo, se necessari
}

class TipoVeicoloDao implements TipoVeicoloDAO {
    public async getAll(): Promise<TipoVeicolo[]> {
        try {
            return await TipoVeicolo.findAll();
        } catch (error) {
            console.error('Errore nel recupero dei tipi di veicolo:', error);
            throw new HttpError(500, 'Errore nel recupero dei tipi di veicolo');
        }
    }

    public async getById(id: number): Promise<TipoVeicolo | null> {
        try {
            return await TipoVeicolo.findByPk(id);
        } catch (error) {
            console.error(`Errore nel recupero del tipo di veicolo con id ${id}:`, error);
            throw new HttpError(500, `Errore nel recupero del tipo di veicolo con id ${id}`);
        }
    }

    public async create(data: TipoVeicoloCreationAttributes): Promise<TipoVeicolo> {
        try {
            return await TipoVeicolo.create(data);
        } catch (error) {
            console.error('Errore nella creazione del tipo di veicolo:', error);
            throw new HttpError(500, 'Errore nella creazione del tipo di veicolo');
        }
    }

    public async update(id: number, data: Partial<TipoVeicoloAttributes>): Promise<[number, TipoVeicolo[]]> {
        try {
            const [affectedCount] = await TipoVeicolo.update(data, { where: { id_tipo_veicolo: id }, returning: true });
            const updatedItems = await TipoVeicolo.findAll({ where: { id_tipo_veicolo: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del tipo di veicolo con id ${id}:`, error);
            throw new HttpError(500, `Errore nell'aggiornamento del tipo di veicolo con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            return await TipoVeicolo.destroy({ where: { id_tipo_veicolo: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del tipo di veicolo con id ${id}:`, error);
            throw new HttpError(500, `Errore nella cancellazione del tipo di veicolo con id ${id}`);
        }
    }
}

export default new TipoVeicoloDao();
