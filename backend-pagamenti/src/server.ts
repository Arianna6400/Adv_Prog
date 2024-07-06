
// Avvia il server e sincronizza i modelli con il database

import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './models';

const PORT = process.env.PAGAMENTI_PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend dei Pagamenti is running on port ${PORT}`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
