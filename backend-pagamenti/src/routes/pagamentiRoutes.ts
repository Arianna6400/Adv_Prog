import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { ricaricaTokenValidation,
         verificaTokenValidation,
         pagaMultaValidation
 } from '../middleware/validate/pagamentiValidate';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();
console.log('----------- entro 2 backend -----------');

router.use(authMiddleware);

router.post('/pagamulta', authorize(['automobilista']), pagaMultaValidation, payMulta);
router.get('/tokenresidui', authorize(['automobilista']), verificaTokenValidation, checkToken);
router.post('/ricaricatoken', authorize(['admin']), ricaricaTokenValidation, rechargeTokens);

export default router;