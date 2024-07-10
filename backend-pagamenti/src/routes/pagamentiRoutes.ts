import { Router } from 'express';
import { payMulta, rechargeTokens, checkToken } from '../controllers/pagamentiController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post('/pagamulta', payMulta);
router.get('/tokenresidui', checkToken);
router.post('/ricaricatoken', rechargeTokens);

export default router;