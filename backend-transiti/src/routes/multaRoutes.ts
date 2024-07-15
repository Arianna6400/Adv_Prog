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
router.get('/multe', authorize(['automobilista']), getMulteByUtente); // rotta per visualizzare tutte le multe di un automobilista 
router.get('/multe/bollettino/:uuid', authorize(['automobilista']), validateDownloadBollettino, downloadBollettino); // rotta per scaricare il bollettino di pagamento di una multa

export default router;
