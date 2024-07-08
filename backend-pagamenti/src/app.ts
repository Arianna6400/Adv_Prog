import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import utenteRoutes from './routes/utenteRoutes'
import { errorHandler } from './middleware/errorHandlerMiddleware';
import { ErrorFactory, ErrorTypes } from './utils/errorFactory'
import { authMiddleware } from './middleware/authMiddleware';

// Carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();

// Middleware per il parsing del corpo delle richieste in formato JSON
app.use(bodyParser.json());

// Middleware di autenticazione per proteggere le rotte
//app.use(authMiddleware);

// Registra le rotte dell'API
app.use('/pagamenti', utenteRoutes);

// Middleware per gestire le rotte non trovate
app.use((req, res, next) => {
  const error = ErrorFactory.createError(ErrorTypes.NotFound, 'Rotta non trovata');
  next(error);
});

// Middleware per la gestione degli errori
app.use(errorHandler);

export default app;