import { Router } from 'express';
import {
    getAllTransiti,
    getTransitoById,
    createTransito,
    updateTransito,
    deleteTransito
} from '../controllers/transitoController';
import authMiddleware from '../middleware/authMiddleware'; 
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/transiti', getAllTransiti);

router.get('/transiti/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    getTransitoById
);

router.post('/transiti', 
    body('veicolo').isString().withMessage('Veicolo must be a string'),
    body('varco').isInt().withMessage('Varco ID must be an integer'),
    body('data_ora').isISO8601().withMessage('Data Ora must be a valid date'),
    validateRequest, 
    createTransito
);

router.put('/transiti/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('veicolo').optional().isString().withMessage('Veicolo must be a string'),
    body('varco').optional().isInt().withMessage('Varco ID must be an integer'),
    body('data_ora').optional().isISO8601().withMessage('Data Ora must be a valid date'),
    validateRequest, 
    updateTransito
);

router.delete('/transiti/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteTransito
);

export default router;
