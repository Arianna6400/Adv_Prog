import { Router } from 'express';
import { authMiddleware, authorize} from '../middleware/authMiddleware';
import {
    handleTransitoRequests,
    createTransito,
    updateTransito,
    deleteTransito
} from '../controllers/transitoController';
import {
    validateHandleTransitoRequests,
    validateCreateTransito,
    validateUpdateTransito,
    validateDeleteTransito
} from '../middleware/validate/transitoValidate';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
// Rotta combinata per gestire tutte le richieste ai transiti
router.get('/transito/:id?', authorize(['operatore']), validateHandleTransitoRequests, handleTransitoRequests);
router.post('/transito', authorize(['operatore','varco']), validateCreateTransito, createTransito);
router.put('/transito/:id', authorize(['operatore']), validateUpdateTransito, updateTransito);
router.delete('/transito/:id', authorize(['operatore']), validateDeleteTransito, deleteTransito);

export default router;
