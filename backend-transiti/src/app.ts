
/*
    Contiene la configurazione e la logica dell’applicazione Express (middleware, rrotte e gestione errori)
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

// Carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();

// Middleware per il parsing del corpo delle richieste in formato JSON, superfluo per Express >= 4.16.0
app.use(bodyParser.json());
// Registra le rotte dell'API
app.use('/api', utenteRoutes); // Registra le rotte dell'API
app.use('/api', varcoZtlRoutes);
app.use('/api', zonaZtlRoutes);
app.use('/api', transitoRoutes);
app.use('/api', multaRoutes);
app.use('/api', tipoVeicoloRoutes);
app.use('/api', veicoloRoutes);
app.use('/api', orarioChiusuraRoutes);

// Registra il middleware per la gestione degli errori dopo tutte le altre rotte e middleware
app.use(errorHandler());

export default app; // Esporta l'applicazione Express