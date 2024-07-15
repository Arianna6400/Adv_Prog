import { Router } from 'express';
import {
    getAllZonaZtl,
    getZonaZtlById,
    getZonaZtlWithTransiti,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';
import {
    validateGetZonaZtlById,
    validateCreateZonaZtl,
    validateUpdateZonaZtl,
    validateDeleteZonaZtl,
    validategetZonaZtlWithTransiti
} from '../middleware/validate/zonaZtlValidate';
import { authMiddleware, authorize} from '../middleware/authMiddleware';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/zonaZtl', authorize(['operatore']), getAllZonaZtl); // rotta per visualizzare tutte le zone ZTL
router.get('/zonaZtl/:id',authorize(['operatore']), validateGetZonaZtlById, getZonaZtlById); // rotta per visualizzare una specifica zona ZTL
router.get('/zonaZtl/:id/transiti', authorize(['operatore']), validategetZonaZtlWithTransiti, getZonaZtlWithTransiti); // rotta per ottenere una zona con tutti i transiti associati
router.post('/zonaZtl',authorize(['operatore']), validateCreateZonaZtl, createZonaZtl); // rotta per creare una zona ZTL
router.put('/zonaZtl/:id',authorize(['operatore']), validateUpdateZonaZtl, updateZonaZtl); // rotta per modificare le informazioni di una zona ZTL
router.delete('/zonaZtl/:id',authorize(['operatore']), validateDeleteZonaZtl, deleteZonaZtl); // rotta per eliminare una zona ZTL

export default router;