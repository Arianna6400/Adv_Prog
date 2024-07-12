import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte
 */
router.post('/pagamulta', payMulta);
router.post('/ricaricatoken/:id', rechargeTokens);
router.get('/tokenresidui', checkToken);

export default router;