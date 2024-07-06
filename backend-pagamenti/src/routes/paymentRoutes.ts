
// Definisce le rotte per gestire i pagamenti

import express from 'express';
import { handlePaymentNotification } from '../controllers/PaymentController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/notify', authenticateJWT, handlePaymentNotification);

export default router;
