import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/pagamulta', authorize(['automobilista']), payMulta);
router.get('/tokenresidui', authorize(['automobilista']), checkToken);
router.post('/ricaricatoken', authorize(['admin']), rechargeTokens);

export default router;