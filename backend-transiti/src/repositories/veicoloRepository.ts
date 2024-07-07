import veicoloDao from '../dao/veicoloDao';
import Veicolo from '../models/veicolo';
import { TransitoAttributes } from '../models/transito';
import transitoDao from '../dao/transitoDao';
import { VeicoloCreationAttributes, VeicoloAttributes } from '../models/veicolo';

class VeicoloRepository {
    public async getAllVeicoli(): Promise<Veicolo[]> {
        try {
            return await veicoloDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero dei veicoli dal repository:', error);
            throw new Error('Impossibile recuperare i veicoli');
        }
    }

    public async getVeicoloById(targa: string): Promise<Veicolo | null> {
        try {
            return await veicoloDao.getById(targa);
        } catch (error) {
            console.error(`Errore nel recupero del veicolo con targa ${targa} dal repository:`, error);
            throw new Error('Impossibile recuperare il veicolo');
        }
    }

    public async createVeicolo(data: VeicoloCreationAttributes): Promise<Veicolo> {
        try {
            return await veicoloDao.create(data);
        } catch (error) {
            console.error('Errore nella creazione del veicolo nel repository:', error);
            throw new Error('Impossibile creare il veicolo');
        }
    }

    public async updateVeicolo(targa: string, data: Partial<VeicoloAttributes>): Promise<[number, Veicolo[]]> {
        try {
            return await veicoloDao.update(targa, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento del veicolo con targa ${targa} nel repository:`, error);
            throw new Error('Impossibile aggiornare il veicolo');
        }
    }

    public async deleteVeicolo(targa: string): Promise<number> {
        try {
            return await veicoloDao.delete(targa);
        } catch (error) {
            console.error(`Errore nella cancellazione del veicolo con targa ${targa} nel repository:`, error);
            throw new Error('Impossibile cancellare il veicolo');
        }
    }

    // Metodo per ottenere tutti i transiti di un veicolo
    public async getTransitiByVeicolo(targa: string): Promise<TransitoAttributes[]> {
        try {
            return await transitoDao.getAllByVeicolo(targa);
        } catch (error) {
            console.error(`Errore nel recupero dei transiti per il veicolo con targa ${targa}:`, error);
            throw new Error('Impossibile recuperare i transiti del veicolo');
        }
    }
}

export default new VeicoloRepository();
