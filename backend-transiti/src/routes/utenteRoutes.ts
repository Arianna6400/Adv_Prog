import { Router } from 'express';
import {
  getUtenti,
  getUtenteById,
  createUtente,
  updateUtente,
  deleteUtente,
  getVeicoliByUtenteId
} from '../controllers/utenteController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequestMiddleware';
import { param, body } from 'express-validator';

const router = Router();

// Applica il middleware di autenticazione per tutte le rotte
router.use(authMiddleware);

router.get('/utenti', getUtenti);

router.get('/utenti/:id', 
  param('id').isInt().withMessage('ID must be an integer'), 
  validateRequest, 
  getUtenteById
);

router.post('/utenti', 
  body('nome').isString().withMessage('Nome must be a string'),
  body('cognome').isString().withMessage('Cognome must be a string'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  validateRequest, 
  createUtente
);

router.put('/utenti/:id', 
  param('id').isInt().withMessage('ID must be an integer'),
  body('nome').optional().isString().withMessage('Nome must be a string'),
  body('cognome').optional().isString().withMessage('Cognome must be a string'),
  body('email').optional().isEmail().withMessage('Email must be a valid email address'),
  validateRequest, 
  updateUtente
);

router.delete('/utenti/:id', 
  param('id').isInt().withMessage('ID must be an integer'), 
  validateRequest, 
  deleteUtente
);

// Rotta per ottenere tutti i veicoli di un utente
router.get('/utenti/:id/veicoli', 
  param('id').isInt().withMessage('ID must be an integer'), 
  validateRequest, 
  getVeicoliByUtenteId
);

export default router;