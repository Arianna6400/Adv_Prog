import { Router } from 'express';
import {
    getAllMulte,
    getMultaById,
    createMulta,
    updateMulta,
    deleteMulta,
    getMulteNonPagate,
    downloadBollettino
} from '../controllers/multaController';
import { authMiddleware } from '../middleware/auth'; // Assicurati di avere un middleware di autenticazione

const router = Router();

// Applicare il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/multe', getAllMulte);
router.get('/multe/:id', getMultaById);
router.post('/multe', createMulta);
router.put('/multe/:id', updateMulta);
router.delete('/multe/:id', deleteMulta);
router.get('/multe/veicolo/:veicolo', getMulteNonPagate);
router.get('/multe/:id/bollettino', downloadBollettino);

export default router;
