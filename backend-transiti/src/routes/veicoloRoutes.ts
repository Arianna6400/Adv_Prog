import { Router } from 'express';
import {
    getAllVeicoli,
    getVeicoloById,
    createVeicolo,
    updateVeicolo,
    deleteVeicolo
} from '../controllers/veicoloController';
import { authMiddleware } from '../middleware/authMiddleware';import {
    validateGetVeicoloById,
    validateCreateVeicolo,
    validateUpdateVeicolo,
    validateDeleteVeicolo
} from '../middleware/validate/veicoloValidate';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/veicoli', getAllVeicoli);
router.get('/veicoli/:targa', validateGetVeicoloById, getVeicoloById);
router.post('/veicoli', validateCreateVeicolo, createVeicolo);
router.put('/veicoli/:targa', validateUpdateVeicolo, updateVeicolo);
router.delete('/veicoli/:targa', validateDeleteVeicolo, deleteVeicolo);

export default router;
