import multaDao from '../dao/multaDao';
import transitoDao from '../dao/transitoDao';
import veicoloDao from '../dao/veicoloDao';
import Multa from '../models/multa';
import Transito from '../models/transito';
import Veicolo from '../models/veicolo';
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

    public async getMulteByUtente(utenteId: number): Promise<Multa[]> {
        try {
            const transiti = await transitoDao.getAll();
            const veicoli = await veicoloDao.getAll();

            // Filtra i veicoli per utente
            const veicoliUtente = veicoli.filter(veicolo => veicolo.utente === utenteId);

            // Filtra i transiti per i veicoli dell'utente
            const transitiUtente = transiti.filter(transito => veicoliUtente.some(veicolo => veicolo.targa === transito.veicolo));

            // Ottieni le multe per i transiti dell'utente
            const multeUtente = await multaDao.getAll();
            const multeFiltrate = multeUtente.filter(multa => transitiUtente.some(transito => transito.id_transito === multa.transito));

            return multeFiltrate;
        } catch (error) {
            throw new Error('Impossibile recuperare le multe per l\'utente');
        }
    }

    public async getMultaWithDetailsById(id: number, userId: number): Promise<{ multa: Multa, transito: Transito, veicolo: Veicolo } | null> {
        try {
            const multa = await multaDao.getById(id);
            if (!multa) {
                return null;
            }

            const transito = await transitoDao.getById(multa.transito);
            if (!transito) {
                throw new Error('Transito non trovato');
            }

            const veicolo = await veicoloDao.getById(transito.veicolo);
            if (!veicolo) {
                throw new Error('Veicolo non trovato');
            }

            if (veicolo.utente !== userId) {
                return null; // L'utente non è autorizzato a vedere questa multa
            }

            return { multa, transito, veicolo };
        } catch (error) {
            console.error(`Errore nel recupero della multa con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare la multa');
        }
    }
}

export default new MultaRepository();