
// Configura l'applicazione Express e le rotte

import express from 'express';
import bodyParser from 'body-parser';
import transitRoutes from './routes/transitRoutes';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/transiti', authMiddleware, transitRoutes);

//Middleware per gestione degli errori
app.use(errorHandler());

export default app;
