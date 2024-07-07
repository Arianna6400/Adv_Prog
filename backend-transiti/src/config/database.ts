
// Configura la connessione al database utilizzando Sequelize
// Carica le variabili di ambiente per configurare il database

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Sequelize;

  // costruttore privato per impedire accesso esterno
  private constructor() {}

  // metodo statico per ottenere istanza singleton di connessione
  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const dbName: string = process.env.DB_NAME || '';
      const dbUsername: string = process.env.DB_USERNAME || '';
      const dbPassword: string = process.env.DB_PASSWORD || '';

      Database.instance = new Sequelize(dbName, dbUsername, dbPassword, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        pool: { // utile in produzione per gestione efficiente del carico di lavoro
          max: 5, // numero max di connessioni attive
          min: 0,
          acquire: 30000, // t_max prima di generare errore
          idle: 10000, // t_max inattività connessione
        },
      });
    }

    return Database.instance;
  }
}

export default Database;