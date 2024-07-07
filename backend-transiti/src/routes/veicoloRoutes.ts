import { Router } from 'express';
import {
    getAllVeicoli,
    getVeicoloById,
    createVeicolo,
    updateVeicolo,
    deleteVeicolo,
    getTransitiByVeicolo
} from '../controllers/veicoloController';
import { authMiddleware } from '../middleware/auth'; // Assicurati di avere un middleware di autenticazione

const router = Router();

// Applicare il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/veicoli', getAllVeicoli);
router.get('/veicoli/:targa', getVeicoloById);
router.post('/veicoli', createVeicolo);
router.put('/veicoli/:targa', updateVeicolo);
router.delete('/veicoli/:targa', deleteVeicolo);
router.get('/veicoli/:targa/transiti', getTransitiByVeicolo);

export default router;
