// Definisce le rotte per gestire i pagamenti

import { Router } from 'express';
import {
  ricaricaCredito,
  verificaCredito,
  pagaMulta
} from '../controllers/utenteController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware'; 
import {
  ricaricaCreditoValidation,
  verificaCreditoValidation,
  pagaMultaValidation
} from '../middleware/validate/utenteValidate';

const router = Router();

router.post('/utenti/ricarica', authMiddleware, adminMiddleware, ricaricaCreditoValidation, ricaricaCredito);
router.get('/utenti/:id/credito', authMiddleware, verificaCreditoValidation, verificaCredito);
router.post('/utenti/paga', authMiddleware, pagaMultaValidation, pagaMulta);

export default router;

