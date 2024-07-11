import { Router } from 'express';
import {
    getAllTransiti,
    getTransitoById,
    createTransito,
    updateTransito,
    deleteTransito
} from '../controllers/transitoController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';
import {
    validateGetTransitoById,
    validateCreateTransito,
    validateUpdateTransito,
    validateDeleteTransito
} from '../middleware/validate/transitoValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/transiti', authorize(['operatore']), getAllTransiti);
router.get('/transiti/:id', authorize(['operatore']), validateGetTransitoById, getTransitoById);
router.post('/transiti', authorize(['operatore','varco']), validateCreateTransito, createTransito);
router.put('/transiti/:id', authorize(['operatore']), validateUpdateTransito, updateTransito);
router.delete('/transiti/:id', authorize(['operatore']), validateDeleteTransito, deleteTransito);

export default router;
