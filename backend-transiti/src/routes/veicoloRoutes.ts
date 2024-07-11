/**
 * POTREBBE ESSERE ELIMINATO
 */
import { Router } from 'express';
import {
    getAllVeicoli,
    getVeicoloById,
    getVeicoliEsenti,
    createVeicolo,
    updateVeicolo,
    deleteVeicolo
} from '../controllers/veicoloController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetVeicoloById,
    validateCreateVeicolo,
    validateUpdateVeicolo,
    validateDeleteVeicolo
} from '../middleware/validate/veicoloValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/veicoli', getAllVeicoli);
router.get('/veicoli/esenti', getVeicoliEsenti);
router.get('/veicoli/:targa', validateGetVeicoloById, getVeicoloById);
router.post('/veicoli', validateCreateVeicolo, createVeicolo);
router.put('/veicoli/:targa', validateUpdateVeicolo, updateVeicolo);
router.delete('/veicoli/:targa', validateDeleteVeicolo, deleteVeicolo);


export default router;
