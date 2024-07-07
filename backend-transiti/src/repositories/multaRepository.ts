import multaDao from '../dao/multaDao';
import Multa from '../models/multa';
import Transito from '../models/transito';
import { MultaCreationAttributes, MultaAttributes } from '../models/multa';

class MultaRepository {
    public async getAllMulte(): Promise<Multa[]> {
        try {
            return await multaDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero delle multe dal repository:', error);
            throw new Error('Impossibile recuperare le multe');
        }
    }

    public async getMultaById(id: number): Promise<Multa | null> {
        try {
            return await multaDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero della multa con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare la multa');
        }
    }

    public async createMulta(data: MultaCreationAttributes): Promise<Multa> {
        try {
            return await multaDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione della multa nel repository:', error);
            throw new Error('Impossibile creare la multa');
        }
    }

    public async updateMulta(id: number, data: Partial<MultaAttributes>): Promise<[number, Multa[]]> {
        try {
            return await multaDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento della multa con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare la multa');
        }
    }

    public async deleteMulta(id: number): Promise<number> {
        try {
            return await multaDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione della multa con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare la multa');
        }
    }

    // Metodo per ottenere tutte le multe non pagate di un automobilista
    public async getMulteNonPagate(veicolo: string): Promise<Multa[]> {
        try {
            return await Multa.findAll({
                include: [{ model: Transito, where: { veicolo } }],
                where: { pagata: false }
            });
        } catch (error) {
            console.error(`Errore nel recupero delle multe non pagate per il veicolo ${veicolo}:`, error);
            throw new Error('Impossibile recuperare le multe non pagate');
        }
    }
}

export default new MultaRepository();
