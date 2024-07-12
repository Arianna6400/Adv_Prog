/**
 * Rotta di autenticazione per il login
 */
import { Router } from 'express';
import { login } from '../controllers/authController';
import { validateLogin } from '../middleware/validate/authValidate';

const router = Router();

router.post('/login', validateLogin, login);

export default router;
