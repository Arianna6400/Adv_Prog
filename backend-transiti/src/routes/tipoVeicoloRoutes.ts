import { Router } from 'express';
import {
    getAllTipoVeicolo,
    getTipoVeicoloById,
    createTipoVeicolo,
    updateTipoVeicolo,
    deleteTipoVeicolo
} from '../controllers/tipoVeicoloController';
import authMiddleware from '../middleware/authMiddleware'; 
import {
    validateGetTipoVeicoloById,
    validateCreateTipoVeicolo,
    validateUpdateTipoVeicolo,
    validateDeleteTipoVeicolo
} from '../middleware/validate/tipoVeicoloValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
//router.use(authMiddleware);

router.get('/tipiVeicolo', getAllTipoVeicolo);
router.get('/tipiVeicolo/:id', validateGetTipoVeicoloById, getTipoVeicoloById);
router.post('/tipiVeicolo', validateCreateTipoVeicolo, createTipoVeicolo);
router.put('/tipiVeicolo/:id', validateUpdateTipoVeicolo, updateTipoVeicolo);
router.delete('/tipiVeicolo/:id', validateDeleteTipoVeicolo, deleteTipoVeicolo);

export default router;
