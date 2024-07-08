import { Router } from 'express';
import {
    getAllOrariChiusura,
    getOrarioChiusuraById,
    createOrarioChiusura,
    updateOrarioChiusura,
    deleteOrarioChiusura
} from '../controllers/orarioChiusuraController';
import authMiddleware from '../middleware/authMiddleware'; 
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/orariChiusura', getAllOrariChiusura);

router.get('/orariChiusura/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest,
    getOrarioChiusuraById
);

router.post('/orariChiusura', 
    body('giorni_settimana_festivi').isString().withMessage('Giorni Settimana Festivi must be a string'),
    body('fascia_oraria_F').isISO8601().withMessage('Fascia Oraria F must be a valid date'),
    body('fascia_oraria_L').isISO8601().withMessage('Fascia Oraria L must be a valid date'),
    body('tariffa_F').isFloat().withMessage('Tariffa F must be a float'),
    body('tariffa_L').isFloat().withMessage('Tariffa L must be a float'),
    validateRequest,
    createOrarioChiusura
);

router.put('/orariChiusura/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('giorni_settimana_festivi').optional().isString().withMessage('Giorni Settimana Festivi must be a string'),
    body('fascia_oraria_F').optional().isISO8601().withMessage('Fascia Oraria F must be a valid date'),
    body('fascia_oraria_L').optional().isISO8601().withMessage('Fascia Oraria L must be a valid date'),
    body('tariffa_F').optional().isFloat().withMessage('Tariffa F must be a float'),
    body('tariffa_L').optional().isFloat().withMessage('Tariffa L must be a float'),
    validateRequest,
    updateOrarioChiusura
);

router.delete('/orariChiusura/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteOrarioChiusura
);

export default router;
