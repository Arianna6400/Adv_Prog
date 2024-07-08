/*
    Contiene la configurazione e la logica dell’applicazione Express (middleware, rotte e gestione errori)
*/

import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import utenteRoutes from './routes/utenteRoutes';
import varcoZtlRoutes from './routes/varcoZtlRoutes';
import zonaZtlRoutes from './routes/zonaZtlRoutes';
import transitoRoutes from './routes/transitoRoutes';
import multaRoutes from './routes/multaRoutes';
import tipoVeicoloRoutes from './routes/tipoVeicoloRoutes';
import veicoloRoutes from './routes/veicoloRoutes';
import orarioChiusuraRoutes from './routes/orarioChiusuraRoutes';
import { errorHandler } from './middleware/errorHandlerMiddleware';
import { ErrorFactory, ErrorTypes } from './utils/errorFactory'
import { authMiddleware } from './middleware/authMiddleware';
import authRoutes from './routes/authRoutes';


// Carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();

// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json()); // Utilizza express.json() invece di bodyParser.json()

// Middleware di autenticazione
app.use('/', authRoutes);
//app.use(authMiddleware);

// Registra le rotte dell'API
app.use('/', utenteRoutes); 
app.use('/', varcoZtlRoutes);
app.use('/', zonaZtlRoutes);
app.use('/', transitoRoutes);
app.use('/', multaRoutes);
app.use('/', tipoVeicoloRoutes);
app.use('/', veicoloRoutes);
app.use('/', orarioChiusuraRoutes);

// Middleware per gestire le rotte non trovate
app.use((req, res, next) => {
  const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Rotta non trovata');
  next(error);
});

// Registra il middleware per la gestione degli errori dopo tutte le altre rotte e middleware
app.use(errorHandler);

export default app; // Esporta l'applicazione Express