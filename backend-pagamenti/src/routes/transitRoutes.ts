
// Definisce le rotte per gestire i transiti

import express from 'express';
import { handleTransit } from '../controllers/TransitController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/transit', authenticateJWT, handleTransit);

export default router;
