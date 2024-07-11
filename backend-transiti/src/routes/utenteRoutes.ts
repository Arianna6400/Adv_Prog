/**
 * POTREBBE ESSERE ELIMINATO
 */
import { Router } from 'express';
import {
  getUtenti,
  getUtenteById,
  createUtente,
  updateUtente,
  deleteUtente
} from '../controllers/utenteController';
import {
  validateGetUtenteById,
  validateCreateUtente,
  validateUpdateUtente,
  validateDeleteUtente
} from '../middleware/validate/utenteValidate';
import { authMiddleware, authorize} from '../middleware/authMiddleware';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/utenti', authorize(['operatore']), getUtenti);
router.get('/utenti/:id', authorize(['operatore']), validateGetUtenteById, getUtenteById);
router.post('/utenti', authorize(['operatore']), validateCreateUtente, createUtente);
router.put('/utenti/:id', authorize(['operatore']), validateUpdateUtente, updateUtente);
router.delete('/utenti/:id', authorize(['operatore']), validateDeleteUtente, deleteUtente);

export default router;