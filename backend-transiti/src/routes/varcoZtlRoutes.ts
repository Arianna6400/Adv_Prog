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

//Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/varchiZtl', authorize(['operatore']), getAllVarcoZtl);
router.get('/varchiZtl/:id', authorize(['operatore']), validateGetVarcoZtlById, getVarcoZtlById);
router.post('/varchiZtl', authorize(['operatore']), validateCreateVarcoZtl, createVarcoZtl);
router.put('/varchiZtl/:id', authorize(['operatore']), validateUpdateVarcoZtl, updateVarcoZtl);
router.delete('/varchiZtl/:id', authorize(['operatore']), validateDeleteVarcoZtl, deleteVarcoZtl);

export default router;
