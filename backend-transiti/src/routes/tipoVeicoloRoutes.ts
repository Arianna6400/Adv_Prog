import { Router } from 'express';
import {
    getAllTipoVeicolo,
    getTipoVeicoloById,
    createTipoVeicolo,
    updateTipoVeicolo,
    deleteTipoVeicolo
} from '../controllers/tipoVeicoloController';
import { authMiddleware } from '../middleware/auth'; // Assicurati di avere un middleware di autenticazione

const router = Router();

// Applicare il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/tipiVeicolo', getAllTipoVeicolo);
router.get('/tipiVeicolo/:id', getTipoVeicoloById);
router.post('/tipiVeicolo', createTipoVeicolo);
router.put('/tipiVeicolo/:id', updateTipoVeicolo);
router.delete('/tipiVeicolo/:id', deleteTipoVeicolo);

export default router;
