import transitoDao from '../dao/transitoDao';
import Transito, { TransitoAttributes, TransitoCreationAttributes } from '../models/transito';
import { MultaCreationAttributes } from '../models/multa';
import multaDao from '../dao/multaDao';
import veicoloDao from '../dao/veicoloDao';
import varcoZtlDao from '../dao/varcoZtlDao';
import orarioChiusuraDao from '../dao/orarioChiusuraDao';
import tipoVeicoloDao from '../dao/tipoVeicoloDao';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from 'sequelize';
import Database from '../utils/database';
import { ErrorFactory, ErrorTypes } from '../utils/errorFactory';

/**
 * Classe TransitoRepository per gestire le operazioni CRUD sui transiti e per il 
 * calcolo delle multe, se necessario.
 */
class TransitoRepository {
    /**
     * Recupera tutti i transiti.
     * 
     * @returns {Promise<any[]>} Una Promise che risolve un array di più Promise combinate.
     */
    public async getAllTransiti(): Promise<any[]> {
        try {
            const transiti = await transitoDao.getAll();
            return await Promise.all(transiti.map(transito => this._enrichTransitoData(transito)));
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile recuperare i transiti');
        }
    }

    /**
     * Recupera un transito per ID.
     * 
     * @param {number} id L'ID del transito. 
     * @returns {Promise<any | null>} Una Promise che risolve più Promise combinate o null se non trovato.
     */
    public async getTransitoById(id: number): Promise<any | null> {
        try {
            const transito = await transitoDao.getById(id);
            if (!transito) {
                return null;
            }
            return await this._enrichTransitoData(transito);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile recuperare il transito con id ${id}`);
        }
    }

    /**
     * Crea un nuovo transito e, se necessario, una multa associata ad esso.
     * 
     * @param {TransitoCreationAttributes} data I dati per creare il transito.
     * @returns {Promise<Transito>} Una Promise che risolve il transito creato.
     */
    public async createTransito(data: TransitoCreationAttributes): Promise<Transito> {
        const sequelize = Database.getInstance(); // Ottieni l'istanza del database

        // Verifica l'esistenza del varco associato
        await varcoZtlDao.getById(data.varco);
        // Verifica l'esistenza del veicolo associato
        await veicoloDao.getById(data.veicolo);

        // Se il varco esiste, inizio una transazione per la creazione del transito
        const transaction: Transaction = await sequelize.transaction();
        try {
            // Crea il transito all'interno della transazione
            const newTransito = await transitoDao.create(data, { transaction });

            // Verifica se è necessario calcolare la multa
            const shouldCalculateMulta = await this._shouldCalculateMulta(newTransito);

            if (shouldCalculateMulta) {
                const multa: MultaCreationAttributes = await this._calcolaMulta(newTransito);
                await multaDao.create(multa, { transaction }); // Crea la multa nel database all'interno della transazione
            }

            // Esegue il commit della transazione se tutto è andato a buon fine
            await transaction.commit();
            return newTransito;
        } catch (error) {
            // Annulla la transazione in caso di errore
            await transaction.rollback();
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Impossibile creare il transito');
        }
    }

    /**
     * Aggiorna un transito esistente.
     * 
     * @param {number} id L'ID del transito. 
     * @param {Partial<TransitoAttributes>} data I dati per aggiornare il transito.
     * @returns {Promise<[number, Transito[]]>} Una Promise che risolve il numero di righe aggiornate e l'array dei transiti aggiornati.
     */
    public async updateTransito(id: number, data: Partial<TransitoAttributes>): Promise<[number, Transito[]]> {
        try {

            // Verifica l'esistenza del transito
            const transito = await transitoDao.getById(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Transito con id ${id} non trovato`);
            }

            // Recupera tutte le multe e verifica se ce n'è una associata al transito
            const multaAssociata = (await multaDao.getAll()).find(multa => multa.transito === id);
            if (multaAssociata) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile aggiornare il transito con id ${id}, poichè associato ad una multa`);
            }
            return await transitoDao.update(id, data);
        } catch (error) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile aggiornare il transito con id ${id}`);
        }
    }

    /**
     * Cancella un transito per ID.
     * 
     * @param {number} id L'ID del transito. 
     * @returns {Promise<number>} Una Promise che risolve il numero di righe cancellate.
     */
    public async deleteTransito(id: number): Promise<number> {
        try {
            // Verifica l'esistenza del transito
            const transito = await transitoDao.getById(id);
            if (!transito) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Transito con id ${id} non trovato`);
            }

            // Recupera tutte le multe e verifica se ce n'è una associata al transito
            const multaAssociata = (await multaDao.getAll()).find(multa => multa.transito === id);
            if (multaAssociata) {
                throw ErrorFactory.createError(ErrorTypes.InternalServerError, `Impossibile eliminare il transito con id ${id}, poichè associato ad una multa`);
            }

            // Procedi con l'eliminazione del transito
            return await transitoDao.delete(id);
        } catch (error) {
            throw (error);
        }
    }

    // HELPER PRIVATI

    /**
     * Metodo privato per la stampa delle informazioni arricchite.
     * 
     * @param {Transito} transito Il transito per il quale stampare le informazioni.
     * @returns {Promise<any[]>} Una Promise che risolve più array di Promise.
     */
    private async _enrichTransitoData(transito: Transito): Promise<any> {
        const veicolo = await veicoloDao.getById(transito.veicolo);
        const varcoZtl = await varcoZtlDao.getById(transito.varco);
        return {
            ...transito.dataValues,
            veicolo: veicolo ? veicolo.dataValues : null,
            varco: varcoZtl ? varcoZtl.dataValues : null
        };
    }

    /**
     * Metodo privato per verificare se è necessario calcolare una multa.
     * 
     * @param {Transito} transito Il transito per il quale verificare la necessità di calcolare la multa.
     * @returns {Promise<boolean>} Una Promise che risolve true se la multa deve essere calcolata, false altrimenti.
     */
    private async _shouldCalculateMulta(transito: Transito): Promise<boolean> {
        const veicolo = await veicoloDao.getById(transito.veicolo);
        if (!veicolo) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Veicolo non trovato');
        }

        // Se il veicolo è esente, non calcolare la multa
        if (veicolo.esente) {
            return false;
        }

        const varcoZtl = await varcoZtlDao.getById(transito.varco);
        if (!varcoZtl) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Varco ZTL non trovato');
        }

        const orarioChiusura = await orarioChiusuraDao.getById(varcoZtl.orario_chiusura);
        if (!orarioChiusura) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Orario di chiusura non trovato');
        }

        const dataTransito = new Date(transito.data_ora);
        const giornoSettimana = dataTransito.getDay(); // 0 (domenica) a 6 (sabato)
        const oraTransito = dataTransito.toTimeString().split(' ')[0]; // Ottieni l'ora del transito in formato HH:MM:SS
        
        // Conversione dei nomi dei giorni in numeri (0 per domenica, 1 per lunedì, ecc.)
        const giorni: { [key: string]: number } = {
            'domenica': 0,
            'lunedì': 1,
            'martedì': 2,
            'mercoledì': 3,
            'giovedì': 4,
            'venerdì': 5,
            'sabato': 6
        };

        // Verifica se il transito avviene in un giorno di chiusura
        const giornoChiusura = orarioChiusura.giorno_chiusura.split(',').map(g => giorni[g.trim().toLowerCase()]);
        const isChiusura = giornoChiusura.includes(giornoSettimana);

        // Se non è un giorno di chiusura, non calcolare la multa
        if (!isChiusura) {
            return false;
        }

        // Determina gli orari di chiusura per il giorno del transito
        const isFestivo = (giornoSettimana === 0 || giornoSettimana === 6);
        const oraInizio = isFestivo ? orarioChiusura.orario_inizio_f : orarioChiusura.orario_inizio_l;
        const oraFine = isFestivo ? orarioChiusura.orario_fine_f : orarioChiusura.orario_fine_l;

        // Verifica se l'ora del transito è all'interno degli orari di chiusura
        if (oraTransito >= oraInizio && oraTransito <= oraFine) {
            return true;
        }

        return false;
    }

    /**
     * Metodo privato per calcolare la multa.
     * 
     * @param {Transito} transito Il transito per il quale calcolare la multa. 
     * @returns {Promise<MultaCreationAttributes>} Una Promise che risolve gli attributi della multa da creare.
     */
    private async _calcolaMulta(transito: Transito): Promise<MultaCreationAttributes> {
        const veicolo = await veicoloDao.getById(transito.veicolo);
        if (!veicolo) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Veicolo non trovato');
        }

        const tipoVeicolo = await tipoVeicoloDao.getById(veicolo.tipo_veicolo);
        if (!tipoVeicolo) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Tipo veicolo non trovato');
        }

        const varcoZtl = await varcoZtlDao.getById(transito.varco);
        if (!varcoZtl) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Varco ZTL non trovato');
        }

        const orarioChiusura = await orarioChiusuraDao.getById(varcoZtl.orario_chiusura);
        if (!orarioChiusura) {
            throw ErrorFactory.createError(ErrorTypes.InternalServerError, 'Orario di chiusura non trovato');
        }

        const dataTransito = new Date(transito.data_ora);
        const giornoSettimana = dataTransito.getDay(); // 0 (domenica) a 6 (sabato)
    
        // Determina se è sabato o domenica
        const isFestivo = (giornoSettimana === 0 || giornoSettimana === 6);

        const tariffaVeicolo = isFestivo ? Number(orarioChiusura.tariffa_f) : Number(orarioChiusura.tariffa_l);
        const tariffaBase = Number(tipoVeicolo.tariffa_base);

        // Calcola l'importo totale della multa
        const importo = tariffaBase + tariffaVeicolo;

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