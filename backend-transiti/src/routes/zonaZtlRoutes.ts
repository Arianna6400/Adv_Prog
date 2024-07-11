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

router.get('/zonaZtl', authorize(['operatore']), getAllZonaZtl);
router.get('/zonaZtl/:id',authorize(['operatore']), validateGetZonaZtlById, getZonaZtlById);
router.post('/zonaZtl',authorize(['operatore']), validateCreateZonaZtl, createZonaZtl);
router.put('/zonaZtl/:id',authorize(['operatore']), validateUpdateZonaZtl, updateZonaZtl);
router.delete('/zonaZtl/:id',authorize(['operatore']), validateDeleteZonaZtl, deleteZonaZtl);

export default router;
