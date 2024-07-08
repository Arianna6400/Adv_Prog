import { Router } from 'express';
import {
    getAllZonaZtl,
    getZonaZtlById,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';
import {
    validateGetZonaZtlById,
    validateCreateZonaZtl,
    validateUpdateZonaZtl,
    validateDeleteZonaZtl
} from '../middleware/validate/zonaZtlValidate';
import { authMiddleware, authorize} from '../middleware/authMiddleware';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/zoneZtl', authorize(['operatore']), getAllZonaZtl);
router.get('/zoneZtl/:id',authorize(['operatore']), validateGetZonaZtlById, getZonaZtlById);
router.post('/zoneZtl',authorize(['operatore']), validateCreateZonaZtl, createZonaZtl);
router.put('/zoneZtl/:id',authorize(['operatore']), validateUpdateZonaZtl, updateZonaZtl);
router.delete('/zoneZtl/:id',authorize(['operatore']), validateDeleteZonaZtl, deleteZonaZtl);

export default router;
