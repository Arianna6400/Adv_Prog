import { body, query } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateLogin = [
  // Controlla l'email sia nel corpo della richiesta che nei parametri di query
  body('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
  query('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
  validateRequest
];
