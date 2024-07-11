import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { ricaricaTokenValidation,
         pagaMultaValidation
 } from '../middleware/validate/pagamentiValidate';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/tokenresidui', authorize(['automobilista']), checkToken);
router.post('/pagamulta', authorize(['automobilista']),pagaMultaValidation, payMulta);
router.post('/ricaricatoken', authorize(['admin']), ricaricaTokenValidation, rechargeTokens);

export default router;