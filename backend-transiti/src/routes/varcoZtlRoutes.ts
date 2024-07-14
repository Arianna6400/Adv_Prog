import { Router } from 'express';
import {
    getAllVarcoZtl,
    getVarcoZtlById,
    getVarcoZtlWithTransiti,
    createVarcoZtl,
    updateVarcoZtl,
    deleteVarcoZtl
} from '../controllers/varcoZtlController';
import { authMiddleware, authorize} from '../middleware/authMiddleware';import {
    validateGetVarcoZtlById,
    validateCreateVarcoZtl,
    validateUpdateVarcoZtl,
    validateDeleteVarcoZtl,
    validategetVarcoZtlWithTransiti
} from '../middleware/validate/varcoZtlValidate';

const router = Router();
/**
 * Middleware di autenticazione per tutte le rotte
 */
router.use(authMiddleware);
/**
 * Definizione delle rotte con relative validazioni ed autorizzazioni
 */
router.get('/varcoZtl', authorize(['operatore']), getAllVarcoZtl); // rotta per visualizzare tutti i varchi ZTL
router.get('/varcoZtl/:id', authorize(['operatore']), validateGetVarcoZtlById, getVarcoZtlById); // rotta per visualizzare uno specifico varco ZTL
router.get('/varchi/:id/transiti', validategetVarcoZtlWithTransiti, getVarcoZtlWithTransiti); // rotta per ottenere un varco con tutti i transiti associati
router.post('/varcoZtl', authorize(['operatore']), validateCreateVarcoZtl, createVarcoZtl); // rotta per creare un varco ZTL
router.put('/varcoZtl/:id', authorize(['operatore']), validateUpdateVarcoZtl, updateVarcoZtl); // rotta per modificare le informazioni di un varcco ZTL
router.delete('/varcoZtl/:id', authorize(['operatore']), validateDeleteVarcoZtl, deleteVarcoZtl); // rotta per eliminare un varco ZTL

export default router;
