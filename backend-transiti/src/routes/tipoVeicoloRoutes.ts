/**
 * POTREBBE ESSERE ELIMINATO
 */
import { Router } from 'express';
import {
    getAllTipoVeicolo,
    getTipoVeicoloById,
    createTipoVeicolo,
    updateTipoVeicolo,
    deleteTipoVeicolo
} from '../controllers/tipoVeicoloController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetTipoVeicoloById,
    validateCreateTipoVeicolo,
    validateUpdateTipoVeicolo,
    validateDeleteTipoVeicolo
} from '../middleware/validate/tipoVeicoloValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/tipiVeicolo', authorize(['operatore']), getAllTipoVeicolo);
router.get('/tipiVeicolo/:id', authorize(['operatore']), validateGetTipoVeicoloById, getTipoVeicoloById);
router.post('/tipiVeicolo', authorize(['operatore']), validateCreateTipoVeicolo, createTipoVeicolo);
router.put('/tipiVeicolo/:id', authorize(['operatore']), validateUpdateTipoVeicolo, updateTipoVeicolo);
router.delete('/tipiVeicolo/:id', authorize(['operatore']), validateDeleteTipoVeicolo, deleteTipoVeicolo);

export default router;
