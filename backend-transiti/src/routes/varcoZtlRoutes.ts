import { Router } from 'express';
import {
    getAllVarcoZtl,
    getVarcoZtlById,
    createVarcoZtl,
    updateVarcoZtl,
    deleteVarcoZtl
} from '../controllers/varcoZtlController';

const router = Router();

router.get('/varchiZtl', getAllVarcoZtl);
router.get('/varchiZtl/:id', getVarcoZtlById);
router.post('/varchiZtl', createVarcoZtl);
router.put('/varchiZtl/:id', updateVarcoZtl);
router.delete('/varchiZtl/:id', deleteVarcoZtl);

export default router;
