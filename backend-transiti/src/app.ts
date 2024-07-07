import express from 'express';
import dotenv from 'dotenv';
import utenteRoutes from './routes/utenteRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config(); // Carica le variabili d'ambiente dal file .env

const app = express();

app.use(express.json()); // Middleware per il parsing del corpo delle richieste in formato JSON
app.use('/api', utenteRoutes); // Registra le rotte dell'API

// Registra il middleware per la gestione degli errori dopo tutte le altre rotte e middleware
app.use(errorHandler());

export default app;