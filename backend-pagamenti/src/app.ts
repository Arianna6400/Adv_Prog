
// Configura starting point applicazione Express

import express from 'express';
import bodyParser from 'body-parser';
import paymentRoutes from './routes/paymentRoutes';
import { authenticateJWT } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/payments', authenticateJWT, paymentRoutes);

//Middleware per gestione degli errori
app.use(errorHandler());

export default app;
