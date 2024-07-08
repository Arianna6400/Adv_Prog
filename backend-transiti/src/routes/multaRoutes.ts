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
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetMultaById,
    validateCreateMulta,
    validateUpdateMulta,
    validateDeleteMulta,
    validateGetMulteNonPagate,
    validateDownloadBollettino
} from '../middleware/validate/multaValidate';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/multe', getAllMulte);
router.get('/multe/:id', validateGetMultaById, getMultaById);
router.post('/multe', validateCreateMulta, createMulta);
router.put('/multe/:id', validateUpdateMulta, updateMulta);
router.delete('/multe/:id', validateDeleteMulta, deleteMulta);
router.get('/multe/veicolo/:veicolo', validateGetMulteNonPagate, getMulteNonPagate);
router.get('/multe/:id/bollettino', validateDownloadBollettino, downloadBollettino);

export default router;
