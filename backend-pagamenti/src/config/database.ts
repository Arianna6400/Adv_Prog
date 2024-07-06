
// Configura la connessione al database utilizzando Sequelize
// Carica le variabili di ambiente per configurare il database

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const dbName: string = process.env.DB_NAME || 'dbName';
      const dbUsername: string = process.env.DB_USERNAME || 'root';
      const dbPassword: string = process.env.DB_PASSWORD || 'root';

      Database.instance = new Sequelize(dbName, dbUsername, dbPassword, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
    }

    return Database.instance;
  }
}

export default Database;