import { Router } from 'express';
import { handleMulteRequests } from '../controllers/multaController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';
import { validateHandleMulteRequests } from '../middleware/validate/multaValidate';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/multe/:uuid?', authorize(['automobilista']), validateHandleMulteRequests, handleMulteRequests); // Rotta combinata per gestire tutte le richieste relative alle multe
export default router;
