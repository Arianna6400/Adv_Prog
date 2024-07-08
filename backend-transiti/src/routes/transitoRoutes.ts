import { Router } from 'express';
import {
    getAllTransiti,
    getTransitoById,
    createTransito,
    updateTransito,
    deleteTransito
} from '../controllers/transitoController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetTransitoById,
    validateCreateTransito,
    validateUpdateTransito,
    validateDeleteTransito
} from '../middleware/validate/transitoValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/transiti', getAllTransiti);
router.get('/transiti/:id', validateGetTransitoById, getTransitoById);
router.post('/transiti', validateCreateTransito, createTransito);
router.put('/transiti/:id', validateUpdateTransito, updateTransito);
router.delete('/transiti/:id', validateDeleteTransito, deleteTransito);

export default router;
