import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/pagamulta', payMulta);
router.post('/ricaricatoken', rechargeTokens);
router.get('/tokenresidui', checkToken);

export default router;