
// Configura la connessione al database utilizzando Sequelize
// Carica le variabili di ambiente per configurare il database

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db_name: string = process.env.DB_NAME || 'dbName';
const db_username: string = process.env.DB_USERNAME || 'root';
const db_password: string = process.env.DB_PASSWORD || 'root';

const sequelize = new Sequelize(db_name, 
                                db_username,
                                db_password, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
});

export default sequelize;
