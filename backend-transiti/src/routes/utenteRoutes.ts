import { Router } from 'express';
import {
  getUtenti,
  getUtenteById,
  createUtente,
  updateUtente,
  deleteUtente,
  getVeicoliByUtenteId
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

router.get('/utenti', authorize(['automobilista']), getUtenti);
router.get('/utenti/:id', validateGetUtenteById, getUtenteById);
router.post('/utenti', validateCreateUtente, createUtente);
router.put('/utenti/:id', validateUpdateUtente, updateUtente);
router.delete('/utenti/:id', validateDeleteUtente, deleteUtente);
// Rotta per ottenere tutti i veicoli di un utente
router.get('/utenti/:id/veicoli', validateGetUtenteById, getVeicoliByUtenteId);

export default router;