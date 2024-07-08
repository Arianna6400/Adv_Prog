import { Router } from 'express';
import {
    getAllVarcoZtl,
    getVarcoZtlById,
    createVarcoZtl,
    updateVarcoZtl,
    deleteVarcoZtl
} from '../controllers/varcoZtlController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

//Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);


router.get('/varchiZtl', getAllVarcoZtl);

router.get('/varchiZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    getVarcoZtlById
);

router.post('/varchiZtl', 
    body('nome').isString().withMessage('Nome must be a string'),
    body('via').optional().isString().withMessage('Via must be a string'),
    body('zona_ztl').isInt().withMessage('Zona ZTL ID must be an integer'),
    body('orario_chiusura').isInt().withMessage('Orario Chiusura ID must be an integer'),
    validateRequest, 
    createVarcoZtl
);

router.put('/varchiZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'),
    body('nome').optional().isString().withMessage('Nome must be a string'),
    body('via').optional().isString().withMessage('Via must be a string'),
    body('zona_ztl').optional().isInt().withMessage('Zona ZTL ID must be an integer'),
    body('orario_chiusura').optional().isInt().withMessage('Orario Chiusura ID must be an integer'),
    validateRequest, 
    updateVarcoZtl
);

router.delete('/varchiZtl/:id', 
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest, 
    deleteVarcoZtl
);

export default router;
