import { Router } from 'express';
import {
    getAllOrariChiusura,
    getOrarioChiusuraById,
    createOrarioChiusura,
    updateOrarioChiusura,
    deleteOrarioChiusura
} from '../controllers/orarioChiusuraController';
import { authMiddleware } from '../middleware/auth'; // Assicurati di avere un middleware di autenticazione

const router = Router();

// Applicare il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/orariChiusura', getAllOrariChiusura);
router.get('/orariChiusura/:id', getOrarioChiusuraById);
router.post('/orariChiusura', createOrarioChiusura);
router.put('/orariChiusura/:id', updateOrarioChiusura);
router.delete('/orariChiusura/:id', deleteOrarioChiusura);

export default router;
