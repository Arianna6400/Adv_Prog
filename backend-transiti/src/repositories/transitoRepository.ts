import transitoDao from '../dao/transitoDao';
import Transito, { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import multaDao from '../dao/multaDao';
import veicoloDao from '../dao/veicoloDao'; // Importa il DAO per i veicoli
import varcoZtlDao from '../dao/varcoZtlDao'; // Importa il DAO per i varchi ZTL
import orarioChiusuraDao from '../dao/orarioChiusuraDao'; // Importa il DAO per gli orari di chiusura
import tipoVeicoloDao from '../dao/tipoVeicoloDao'; // Importa il DAO per i tipi di veicolo
import { v4 as uuidv4 } from 'uuid'; // Importa il pacchetto per generare UUID

class TransitoRepository {
    public async getAllTransiti(): Promise<Transito[]> {
        try {
            return await transitoDao.getAll();
        } catch (error) {
            console.error('Errore nel recupero dei transiti dal repository:', error);
            throw new Error('Impossibile recuperare i transiti');
        }
    }

    public async getTransitoById(id: number): Promise<Transito | null> {
        try {
            return await transitoDao.getById(id);
        } catch (error) {
            console.error(`Errore nel recupero del transito con id ${id} dal repository:`, error);
            throw new Error('Impossibile recuperare il transito');
        }
    }

    public async createTransito(data: TransitoCreationAttributes): Promise<Transito> {
        try {
            const newTransito = await transitoDao.create(data);

            // Verifica se è necessario calcolare la multa
            const shouldCalculateMulta = await this.shouldCalculateMulta(newTransito);

            if (shouldCalculateMulta) {
                const multa: MultaCreationAttributes = await this.calcolaMulta(newTransito);
                await multaDao.create(multa); // Crea la multa nel database
            }

            return newTransito;
        } catch (error) {
            console.error('Errore nella creazione del transito nel repository:', error);
            throw new Error('Impossibile creare il transito');
        }
    }

    public async updateTransito(id: number, data: Partial<TransitoAttributes>): Promise<[number, Transito[]]> {
        try {
            return await transitoDao.update(id, data);
        } catch (error) {
            console.error(`Errore nell'aggiornamento del transito con id ${id} nel repository:`, error);
            throw new Error('Impossibile aggiornare il transito');
        }
    }

    public async deleteTransito(id: number): Promise<number> {
        try {
            return await transitoDao.delete(id);
        } catch (error) {
            console.error(`Errore nella cancellazione del transito con id ${id} nel repository:`, error);
            throw new Error('Impossibile cancellare il transito');
        }
    }

    // Metodo per verificare se è necessario calcolare una multa
    private async shouldCalculateMulta(transito: Transito): Promise<boolean> {
        const veicolo = await veicoloDao.getById(transito.veicolo);
        if (!veicolo) {
            throw new Error('Veicolo non trovato');
        }

        // Se il veicolo è esente, non calcolare la multa
        if (veicolo.esente) {
            return false;
        }

        const varcoZtl = await varcoZtlDao.getById(transito.varco);
        if (!varcoZtl) {
            throw new Error('Varco ZTL non trovato');
        }

        const orarioChiusura = await orarioChiusuraDao.getById(varcoZtl.orario_chiusura);
        if (!orarioChiusura) {
            throw new Error('Orario di chiusura non trovato');
        }

        const dataTransito = new Date(transito.data_ora);
        const giornoSettimana = dataTransito.getDay(); // 0 (domenica) a 6 (sabato)
        const oraTransito = `${dataTransito.getHours()}:${dataTransito.getMinutes()}`; // Es. 14:30

        // Verifica se il transito avviene in un giorno festivo
        const giorniFestivi = orarioChiusura.giorni_settimana_festivi.split(',');
        const isFestivo = giorniFestivi.includes(giornoSettimana.toString());

        // Converti gli orari di inizio e fine in Date
        const [oraInizio, oraFine] = isFestivo
            ? [orarioChiusura.orario_inizio_f, orarioChiusura.orario_fine_f]
            : [orarioChiusura.orario_inizio_l, orarioChiusura.orario_fine_l];

        // Verifica se l'ora del transito è all'interno degli orari di chiusura
        if (oraTransito >= oraInizio && oraTransito <= oraFine) {
            return true;
        }

        return false;
    }

    // Metodo per calcolare la multa
    private async calcolaMulta(transito: Transito): Promise<MultaCreationAttributes> {
        const veicolo = await veicoloDao.getById(transito.veicolo);
        if (!veicolo) {
            throw new Error('Veicolo non trovato');
        }

        const tipoVeicolo = await tipoVeicoloDao.getById(veicolo.tipo_veicolo);
        if (!tipoVeicolo) {
            throw new Error('Tipo veicolo non trovato');
        }

        const varcoZtl = await varcoZtlDao.getById(transito.varco);
        if (!varcoZtl) {
            throw new Error('Varco ZTL non trovato');
        }

        const orarioChiusura = await orarioChiusuraDao.getById(varcoZtl.orario_chiusura);
        if (!orarioChiusura) {
            throw new Error('Orario di chiusura non trovato');
        }

        const dataTransito = new Date(transito.data_ora);
        const giornoSettimana = dataTransito.getDay(); // 0 (domenica) a 6 (sabato)
        const isFestivo = orarioChiusura.giorni_settimana_festivi.split(',').includes(giornoSettimana.toString());

        const tariffa = isFestivo ? orarioChiusura.tariffa_f : orarioChiusura.tariffa_l;

        // Calcola l'importo totale della multa
        const importo = tipoVeicolo.tariffa_base + tariffa;

        const multa: MultaCreationAttributes = {
            transito: transito.id_transito,
            data_multa: new Date(),
            importo_token: importo,
            pagata: false,
            uuid_pagamento: uuidv4(), // Genera un UUID per il pagamento
        };

        return multa;
    }
}

export default new TransitoRepository();
