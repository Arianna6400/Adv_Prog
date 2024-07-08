import { Router } from 'express';
import {
    getAllVeicoli,
    getVeicoloById,
    createVeicolo,
    updateVeicolo,
    deleteVeicolo,
    getTransitiByVeicolo
} from '../controllers/veicoloController';
import { authMiddleware } from '../middleware/authMiddleware'; 
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/veicoli', getAllVeicoli);

router.get('/veicoli/:targa', 
    param('targa').isString().withMessage('Targa must be a string'), 
    validateRequest, 
    getVeicoloById
);

router.post('/veicoli', 
    body('targa').isString().withMessage('Targa must be a string'),
    body('esente').isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').isInt().withMessage('Tipo Veicolo ID must be an integer'),
    body('utente').isInt().withMessage('Utente ID must be an integer'),
    validateRequest, 
    createVeicolo
);

router.put('/veicoli/:targa', 
    param('targa').isString().withMessage('Targa must be a string'),
    body('esente').optional().isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').optional().isInt().withMessage('Tipo Veicolo ID must be an integer'),
    body('utente').optional().isInt().withMessage('Utente ID must be an integer'),
    validateRequest, 
    updateVeicolo
);

router.delete('/veicoli/:targa', 
    param('targa').isString().withMessage('Targa must be a string'), 
    validateRequest, 
    deleteVeicolo
);

router.get('/veicoli/:targa/transiti', 
    param('targa').isString().withMessage('Targa must be a string'), 
    validateRequest, 
    getTransitiByVeicolo
);

export default router;
