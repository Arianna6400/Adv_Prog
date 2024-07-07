import { Router } from 'express';
import {
    getAllTransiti,
    getTransitoById,
    createTransito,
    updateTransito,
    deleteTransito
} from '../controllers/transitoController';
import { authMiddleware } from '../middleware/auth'; 

const router = Router();

// Applicare il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/transiti', getAllTransiti);
router.get('/transiti/:id', getTransitoById);
router.post('/transiti', createTransito);
router.put('/transiti/:id', updateTransito);
router.delete('/transiti/:id', deleteTransito);

export default router;
