import { Router } from 'express';
import {
    getMulteByUtente,
    downloadBollettino
} from '../controllers/multaController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';import {
    validateDownloadBollettino
} from '../middleware/validate/multaValidate';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/multe', authorize(['automobilista']), getMulteByUtente);
router.get('/multe/bollettino/:uuid', authorize(['automobilista']), validateDownloadBollettino, downloadBollettino);

export default router;
