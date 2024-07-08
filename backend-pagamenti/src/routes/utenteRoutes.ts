// Definisce le rotte per gestire i pagamenti

import { Router } from 'express';
import {
  ricaricaCredito,
  verificaCredito,
  pagaMulta
} from '../controllers/utenteController'; 
import {
  ricaricaCreditoValidation,
  verificaCreditoValidation,
  pagaMultaValidation
} from '../middleware/validate/utenteValidate';
import { authMiddleware, authorize} from '../middleware/authMiddleware';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.post('/ricarica', authorize(['automobilista']), ricaricaCreditoValidation, ricaricaCredito);
router.get('/credito/:id', authorize(['automobilista']),  verificaCreditoValidation, verificaCredito);
router.post('/paga', authorize(['automobilista']), pagaMultaValidation, pagaMulta);

export default router;

