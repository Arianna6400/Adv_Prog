import { Router } from 'express';
import {
    getAllZonaZtl,
    getZonaZtlById,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';
import authMiddleware from '../middleware/authMiddleware';
import {
    validateGetZonaZtlById,
    validateCreateZonaZtl,
    validateUpdateZonaZtl,
    validateDeleteZonaZtl
} from '../middleware/validate/zonaZtlValidate';


const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/zoneZtl', getAllZonaZtl);
router.get('/zoneZtl/:id', validateGetZonaZtlById, getZonaZtlById);
router.post('/zoneZtl', validateCreateZonaZtl, createZonaZtl);
router.put('/zoneZtl/:id', validateUpdateZonaZtl, updateZonaZtl);
router.delete('/zoneZtl/:id', validateDeleteZonaZtl, deleteZonaZtl);

export default router;
