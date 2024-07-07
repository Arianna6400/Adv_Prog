import { Router } from 'express';
import {
  getUtenti,
  getUtenteById,
  createUtente,
  updateUtente,
  deleteUtente,
  getVeicoliByUtenteId
} from '../controllers/utenteController';

const router = Router();

router.get('/utenti', getUtenti);
router.get('/utenti/:id', getUtenteById);
router.post('/utenti', createUtente);
router.put('/utenti/:id', updateUtente);
router.delete('/utenti/:id', deleteUtente);

// Rotta per ottenere tutti i veicoli di un utente
router.get('/utenti/:id/veicoli', getVeicoliByUtenteId);

export default router;