import { Router } from 'express';
import {
    getAllMulte,
    getMultaById,
    createMulta,
    updateMulta,
    deleteMulta,
    getMulteNonPagate,
    downloadBollettino
} from '../controllers/multaController';
import authMiddleware from '../middleware/authMiddleware'; 
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/multe', getAllMulte);

router.get('/multe/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    getMultaById
);

router.post('/multe', 
    body('transito').isInt().withMessage('Transito ID must be an integer'),
    body('importo_token').isNumeric().withMessage('Importo must be a number'),
    validateRequest, 
    createMulta
);

router.put('/multe/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('transito').optional().isInt().withMessage('Transito ID must be an integer'),
    body('importo_token').optional().isNumeric().withMessage('Importo must be a number'),
    validateRequest, 
    updateMulta
);

router.delete('/multe/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteMulta
);

router.get('/multe/veicolo/:veicolo', 
    param('veicolo').isString().withMessage('Veicolo must be a string'), 
    validateRequest, 
    getMulteNonPagate
);

router.get('/multe/:id/bollettino', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    downloadBollettino
);


export default router;
