import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { ricaricaTokenValidation,
         pagaMultaValidation
 } from '../middleware/validate/pagamentiValidate';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/tokenresidui', authorize(['automobilista']), checkToken);
router.post('/pagamulta', authorize(['automobilista']),pagaMultaValidation, payMulta);
router.post('/ricaricatoken', authorize(['admin']), ricaricaTokenValidation, rechargeTokens);

export default router;