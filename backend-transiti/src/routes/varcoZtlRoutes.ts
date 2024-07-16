import { Router } from 'express';
import { authMiddleware, authorize} from '../middleware/authMiddleware';
import {
    handleVarcoZtlRequests,
    createVarcoZtl,
    updateVarcoZtl,
    deleteVarcoZtl
} from '../controllers/varcoZtlController';
import {
    validateCreateVarcoZtl,
    validateUpdateVarcoZtl,
    validateDeleteVarcoZtl,
    validateHandleVarcoZtlRequests
} from '../middleware/validate/varcoZtlValidate';

const router = Router();

/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);

/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/varcoZtl/:id?/:transiti?', authorize(['operatore']),validateHandleVarcoZtlRequests, handleVarcoZtlRequests); // Rotta combinata per gestire tutte le richieste ai varchi ZTL
router.post('/varcoZtl', authorize(['operatore']), validateCreateVarcoZtl, createVarcoZtl); // rotta per creare un varco ZTL
router.put('/varcoZtl/:id', authorize(['operatore']), validateUpdateVarcoZtl, updateVarcoZtl); // rotta per modificare le informazioni di un varcco ZTL
router.delete('/varcoZtl/:id', authorize(['operatore']), validateDeleteVarcoZtl, deleteVarcoZtl); // rotta per eliminare un varco ZTL

export default router;
