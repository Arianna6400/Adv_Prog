import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte al backend-pagamenti
 */
router.post('/pagamulta', payMulta); // rotta per il pagamento di una multa
router.post('/ricaricatoken/:id', rechargeTokens); // rotta per la ricarica dei token di un utente
router.get('/tokenresidui', checkToken); // rotta per il controllo dei token residui dell'utente 

export default router;