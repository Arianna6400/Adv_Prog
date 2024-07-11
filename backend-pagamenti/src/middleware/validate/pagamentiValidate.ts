import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const ricaricaTokenValidation = [
  body('id').isInt().withMessage('ID must be an integer'),
  body('importo').isFloat({ gt: 0 }).withMessage('Importo must be positive'),
  validateRequest
];

export const verificaTokenValidation = [
  param('id').isInt().withMessage('ID must be an integer'),
  validateRequest
];

export const pagaMultaValidation = [
  body('uuid_pagamento').isUUID().withMessage('UUID pagamento must be a valid UUID'),
  body('importo').isFloat({ gt: 0 }).withMessage('Importo must be positive'),
  validateRequest
];
