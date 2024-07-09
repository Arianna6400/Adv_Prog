import { body, query } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateLogin = [
  // Controlla l'email sia nel corpo della richiesta che nei parametri di query
  body('email').optional().isEmail().withMessage('Email must be a valid email address'),
  query('email').optional().isEmail().withMessage('Email must be a valid email address'),
  validateRequest
];
