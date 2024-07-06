
// Configura l'applicazione Express e le rotte

import express from 'express';
import bodyParser from 'body-parser';
import transitRoutes from './routes/transitRoutes';
import { authenticateJWT } from './middleware/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/transits', authenticateJWT, transitRoutes);

export default app;
