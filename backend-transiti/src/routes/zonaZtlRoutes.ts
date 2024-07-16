import { Router } from 'express';
import { authMiddleware, authorize} from '../middleware/authMiddleware';
import {
    handleZonaZtlRequests,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';
import {
    validateHandleZonaZtlRequests,
    validateCreateZonaZtl,
    validateUpdateZonaZtl,
    validateDeleteZonaZtl
} from '../middleware/validate/zonaZtlValidate';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
// Rotta combinata per gestire tutte le richieste alle zone ZTL
router.get('/zonaZtl/:id?/:transiti?', authorize(['operatore']), validateHandleZonaZtlRequests, handleZonaZtlRequests);
router.post('/zonaZtl',authorize(['operatore']), validateCreateZonaZtl, createZonaZtl); // rotta per creare una zona ZTL
router.put('/zonaZtl/:id',authorize(['operatore']), validateUpdateZonaZtl, updateZonaZtl); // rotta per modificare le informazioni di una zona ZTL
router.delete('/zonaZtl/:id',authorize(['operatore']), validateDeleteZonaZtl, deleteZonaZtl); // rotta per eliminare una zona ZTL

export default router;