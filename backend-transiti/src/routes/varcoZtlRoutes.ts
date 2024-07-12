import { Router } from 'express';
import {
    getAllVarcoZtl,
    getVarcoZtlById,
    createVarcoZtl,
    updateVarcoZtl,
    deleteVarcoZtl
} from '../controllers/varcoZtlController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetVarcoZtlById,
    validateCreateVarcoZtl,
    validateUpdateVarcoZtl,
    validateDeleteVarcoZtl
} from '../middleware/validate/varcoZtlValidate';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/varcoZtl', authorize(['operatore']), getAllVarcoZtl);
router.get('/varcoZtl/:id', authorize(['operatore']), validateGetVarcoZtlById, getVarcoZtlById);
router.post('/varcoZtl', authorize(['operatore']), validateCreateVarcoZtl, createVarcoZtl);
router.put('/varcoZtl/:id', authorize(['operatore']), validateUpdateVarcoZtl, updateVarcoZtl);
router.delete('/varcoZtl/:id', authorize(['operatore']), validateDeleteVarcoZtl, deleteVarcoZtl);

export default router;
