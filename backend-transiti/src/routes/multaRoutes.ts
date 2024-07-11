import { Router } from 'express';
import {
    getMultaById,
    downloadBollettino
} from '../controllers/multaController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';import {
    validateGetMultaById,
    validateDownloadBollettino
} from '../middleware/validate/multaValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/multe', authorize(['automobilista']), validateGetMultaById, getMultaById);
router.get('/multe/:id/bollettino', authorize(['automobilista']), validateDownloadBollettino, downloadBollettino);

export default router;
