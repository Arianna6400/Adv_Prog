import { Router } from 'express';
import {
    getAllZonaZtl,
    getZonaZtlById,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';

const router = Router();

router.get('/zoneZtl', getAllZonaZtl);
router.get('/zoneZtl/:id', getZonaZtlById);
router.post('/zoneZtl', createZonaZtl);
router.put('/zoneZtl/:id', updateZonaZtl);
router.delete('/zoneZtl/:id', deleteZonaZtl);

export default router;
