/**
 * POTREBBE ESSERE ELIMINATO
 */
import { Router } from 'express';
import {
    getAllOrariChiusura,
    getOrarioChiusuraById,
    createOrarioChiusura,
    updateOrarioChiusura,
    deleteOrarioChiusura
} from '../controllers/orarioChiusuraController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';
import {
    validateGetOrarioChiusuraById,
    validateCreateOrarioChiusura,
    validateUpdateOrarioChiusura,
    validateDeleteOrarioChiusura
} from '../middleware/validate/orarioChiusuraValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/orariChiusura', authorize(['operatore']), getAllOrariChiusura);
router.get('/orariChiusura/:id', authorize(['operatore']), validateGetOrarioChiusuraById, getOrarioChiusuraById);
router.post('/orariChiusura', authorize(['operatore']), validateCreateOrarioChiusura, createOrarioChiusura);
router.put('/orariChiusura/:id', authorize(['operatore']), validateUpdateOrarioChiusura, updateOrarioChiusura);
router.delete('/orariChiusura/:id', authorize(['operatore']), validateDeleteOrarioChiusura, deleteOrarioChiusura);

export default router;
