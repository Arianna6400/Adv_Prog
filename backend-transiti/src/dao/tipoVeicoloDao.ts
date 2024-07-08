import TipoVeicolo from '../models/tipoVeicolo';
import { ErrorFactory, ErrorTypes, HttpError } from '../utils/errorFactory';
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
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nel recupero dei tipi di veicolo');
        }
    }

    public async getById(id: number): Promise<TipoVeicolo | null> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            return tipoVeicolo;
        } catch (error) {
            console.error(`Errore nel recupero del tipo di veicolo con id ${id}:`, error);
            if (error instanceof HttpError) {
                throw error; // Rilancia l'errore personalizzato
            }
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nel recupero del tipo di veicolo con id ${id}`);
        }
    }

    public async create(data: TipoVeicoloCreationAttributes): Promise<TipoVeicolo> {
        try {
            return await TipoVeicolo.create(data);
        } catch (error) {
            console.error('Errore nella creazione del tipo di veicolo:', error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Errore nella creazione del tipo di veicolo');
        }
    }

    public async update(id: number, data: Partial<TipoVeicoloAttributes>): Promise<[number, TipoVeicolo[]]> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            const [affectedCount] = await TipoVeicolo.update(data, { where: { id_tipo_veicolo: id }, returning: true });
            const updatedItems = await TipoVeicolo.findAll({ where: { id_tipo_veicolo: id } });
            return [affectedCount, updatedItems];
        } catch (error) {
            console.error(`Errore nell'aggiornamento del tipo di veicolo con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nell'aggiornamento del tipo di veicolo con id ${id}`);
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            const tipoVeicolo = await TipoVeicolo.findByPk(id);
            if (!tipoVeicolo) {
                throw ErrorFactory.createError(ErrorTypes.NotFound, `Tipo di veicolo con id ${id} non trovato`);
            }
            return await TipoVeicolo.destroy({ where: { id_tipo_veicolo: id } });
        } catch (error) {
            console.error(`Errore nella cancellazione del tipo di veicolo con id ${id}:`, error);
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Errore nella cancellazione del tipo di veicolo con id ${id}`);
        }
    }
}

export default new TipoVeicoloDao();