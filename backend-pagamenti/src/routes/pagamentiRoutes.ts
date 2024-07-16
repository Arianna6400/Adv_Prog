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
router.get('/tokenresidui', authorize(['automobilista']), checkToken); // rotta per verificare i token residui di un utente
router.post('/pagamulta', authorize(['automobilista']),pagaMultaValidation, payMulta); // rotta che permette ad un utente di pagare una multa dato il suo uuid
router.post('/ricaricatoken/:id', authorize(['admin']), ricaricaTokenValidation, rechargeTokens); // rotta che permette di ricaricare i token di un utente, dato il suo id

export default router;