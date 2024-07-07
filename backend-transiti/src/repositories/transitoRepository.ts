import transitoDao from '../dao/transitoDao';
import Transito, { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';
import { MultaAttributes, MultaCreationAttributes } from '../models/multa';
import multaDao from '../dao/multaDao';
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
            // Logica per la creazione automatica della multa
            const multa: MultaCreationAttributes = this.calcolaMulta(newTransito);
            await multaDao.create(multa); // Crea la multa nel database
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

    // Metodo per calcolare la multa
    private calcolaMulta(transito: Transito): MultaCreationAttributes {
        const importo = 100; // Calcola l'importo della multa basandoti sulla logica richiesta
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
