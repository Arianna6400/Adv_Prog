
// Avvia il server e sincronizza i modelli con il database

import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { sequelize } from './models/index';

const PORT = process.env.TRANSITI_PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend dei Transiti is running on port ${PORT}`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
