import { body,CustomSanitizer } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Middleware personalizzato per arrotondare i numeri a due decimali
const roundToTwoDecimals: CustomSanitizer = (value: number) => {
  return parseFloat(value.toFixed(2));
};

export const ricaricaTokenValidation = [
  body('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
  body('tokens').isFloat({ gt: 0 }).withMessage('Importo deve essere un float positivo').toFloat().customSanitizer(roundToTwoDecimals),
  validateRequest
];

export const pagaMultaValidation = [
  body('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
  validateRequest
];
