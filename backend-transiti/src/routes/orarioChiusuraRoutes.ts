import { Router } from 'express';
import {
    getAllOrariChiusura,
    getOrarioChiusuraById,
    createOrarioChiusura,
    updateOrarioChiusura,
    deleteOrarioChiusura
} from '../controllers/orarioChiusuraController';
import authMiddleware from '../middleware/authMiddleware'; 
import {
    validateGetOrarioChiusuraById,
    validateCreateOrarioChiusura,
    validateUpdateOrarioChiusura,
    validateDeleteOrarioChiusura
} from '../middleware/validate/orarioChiusuraValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/orariChiusura', getAllOrariChiusura);
router.get('/orariChiusura/:id', validateGetOrarioChiusuraById, getOrarioChiusuraById);
router.post('/orariChiusura', validateCreateOrarioChiusura, createOrarioChiusura);
router.put('/orariChiusura/:id', validateUpdateOrarioChiusura, updateOrarioChiusura);
router.delete('/orariChiusura/:id', validateDeleteOrarioChiusura, deleteOrarioChiusura);

export default router;
