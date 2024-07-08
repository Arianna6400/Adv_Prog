import { Router } from 'express';
import {
    getAllZonaZtl,
    getZonaZtlById,
    createZonaZtl,
    updateZonaZtl,
    deleteZonaZtl
} from '../controllers/zonaZtlController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/zoneZtl', getAllZonaZtl);

router.get('/zoneZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    getZonaZtlById
);

router.post('/zoneZtl', 
    body('nome').isString().withMessage('Nome must be a string'),
    validateRequest, 
    createZonaZtl
);

router.put('/zoneZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('nome').optional().isString().withMessage('Nome must be a string'),
    validateRequest, 
    updateZonaZtl
);

router.delete('/zoneZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteZonaZtl
);

export default router;
