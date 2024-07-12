import { body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Array di middleware di validazione per la rotta di ricarica dei token
 */
export const ricaricaTokenValidation = [
  body('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
  body('tokens').isFloat({ gt: 0 }).withMessage('Importo deve essere un float positivo').toFloat(),
  validateRequest
];
/**
 * Array di middleware di validazione per la rotta di pagamento delle multe
 */
export const pagaMultaValidation = [
  body('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
  validateRequest
];
