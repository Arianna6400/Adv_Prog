// Rotta di autenticazione per il login

import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login);

export default router;
