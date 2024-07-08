
// Inizializza i modelli di Sequelize e definisce le relazioni tra i modelli

import Database from '../utils/database';
import Utente from './utente';

const sequelize = Database.getInstance();

const db = {
  sequelize,
  Utente,
};

// Funzione per sincronizzare i modelli con il database
export const initModels = async () => {
  await sequelize.sync({ alter: true }); // Usa { alter: true } per aggiornare le tabelle esistenti
};

export default db;