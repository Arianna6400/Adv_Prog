
// Configura starting point applicazione Express

import express from 'express';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/utenteRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/payments', authMiddleware, paymentRoutes);

//Middleware per gestione degli errori
app.use(errorHandler());

export default app;
