import tipoVeicoloDao from '../dao/tipoVeicoloDao';
import TipoVeicolo from '../models/tipoVeicolo';
import { TipoVeicoloCreationAttributes, TipoVeicoloAttributes } from '../models/tipoVeicolo';

class TipoVeicoloRepository {
    public async getAllTipoVeicolo(): Promise<TipoVeicolo[]> {
        try {
            return await tipoVeicoloDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero dei tipi di veicolo dal repository:', error);
            throw new Error('Impossibile recuperare i tipi di veicolo');
        }
    }

    public async getTipoVeicoloById(id: number): Promise<TipoVeicolo | null> {
        try {
            return await tipoVeicoloDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero del tipo di veicolo con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare il tipo di veicolo');
        }
    }

    public async createTipoVeicolo(data: TipoVeicoloCreationAttributes): Promise<TipoVeicolo> {
        try {
            return await tipoVeicoloDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione del tipo di veicolo nel repository:', error);
            throw new Error('Impossibile creare il tipo di veicolo');
        }
    }

    public async updateTipoVeicolo(id: number, data: Partial<TipoVeicoloAttributes>): Promise<[number, TipoVeicolo[]]> {
        try {
            return await tipoVeicoloDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento del tipo di veicolo con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare il tipo di veicolo');
        }
    }

    public async deleteTipoVeicolo(id: number): Promise<number> {
        try {
            return await tipoVeicoloDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione del tipo di veicolo con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare il tipo di veicolo');
        }
    }
}

export default new TipoVeicoloRepository();
