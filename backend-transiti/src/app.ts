/**
 * Contiene la configurazione e la logica dell’applicazione Express (middleware, rotte e gestione errori)
 */
import express from 'express';
import dotenv from 'dotenv';
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
import authRoutes from './routes/authRoutes';
import pagamentiRoutes from './routes/pagamentiRoutes'

// Carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();

// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(express.json());
// Middleware di autenticazione
app.use('/', authRoutes);
// Registra le rotte dell'API
app.use('/', pagamentiRoutes);
// Registra le rotte dell'API
app.use('/', varcoZtlRoutes);
app.use('/', zonaZtlRoutes);
app.use('/', transitoRoutes);
app.use('/', multaRoutes);

// Rotte aggiuntive, non verificate, superflue ai fini dell'esame
app.use('/', veicoloRoutes);
app.use('/', tipoVeicoloRoutes);
app.use('/', orarioChiusuraRoutes);
app.use('/', utenteRoutes);

// Middleware per gestire le rotte non trovate
app.use((req, res, next) => {
  next(ErrorFactory.createError(ErrorTypes.NotFound, 'Rotta non trovata in backend-transiti'));
});

// Middleware per la gestione degli errori
app.use(errorHandler);

export default app; // Esporta l'applicazione Express