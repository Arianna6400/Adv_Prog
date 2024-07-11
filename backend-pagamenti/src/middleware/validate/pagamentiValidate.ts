import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const ricaricaTokenValidation = [
  body('id').isInt().withMessage('ID deve essere un intero'),
  body('importo').isFloat({ gt: 0 }).withMessage('Importo deve essere un float positivo'),
  validateRequest
];

export const verificaTokenValidation = [
  param('id').isInt().withMessage('ID deve essere uun intero'),
  validateRequest
];

export const pagaMultaValidation = [
  body('uuid_pagamento').isUUID().withMessage('UUID deve essere un UUID valido'),
  body('importo').isFloat({ gt: 0 }).withMessage('Importo deve essere positivo'),
  validateRequest
];
