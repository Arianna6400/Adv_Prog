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

router.get('/varchiZtl', getAllVarcoZtl);
router.get('/varchiZtl/:id', validateGetVarcoZtlById, getVarcoZtlById);
router.post('/varchiZtl', validateCreateVarcoZtl, createVarcoZtl);
router.put('/varchiZtl/:id', validateUpdateVarcoZtl, updateVarcoZtl);
router.delete('/varchiZtl/:id', validateDeleteVarcoZtl, deleteVarcoZtl);

export default router;
