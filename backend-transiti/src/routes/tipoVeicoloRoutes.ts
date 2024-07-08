import { Router } from 'express';
import {
    getAllTipoVeicolo,
    getTipoVeicoloById,
    createTipoVeicolo,
    updateTipoVeicolo,
    deleteTipoVeicolo
} from '../controllers/tipoVeicoloController';
import authMiddleware from '../middleware/authMiddleware'; 
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/tipiVeicolo', getAllTipoVeicolo);

router.get('/tipiVeicolo/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    getTipoVeicoloById
);

router.post('/tipiVeicolo', 
    body('descrizione').isString().withMessage('Descrizione must be a string'),
    body('tariffa_base').isFloat().withMessage('Tariffa Base must be a float'),
    validateRequest, 
    createTipoVeicolo
);

router.put('/tipiVeicolo/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('descrizione').optional().isString().withMessage('Descrizione must be a string'),
    body('tariffa_base').optional().isFloat().withMessage('Tariffa Base must be a float'),
    validateRequest, 
    updateTipoVeicolo
);

router.delete('/tipiVeicolo/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteTipoVeicolo
);

export default router;
