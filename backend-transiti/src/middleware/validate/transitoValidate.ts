import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTransitoById = [
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest
];

export const validateCreateTransito = [
    body('veicolo').isString().withMessage('Veicolo must be a string'),
    body('varco').isInt().withMessage('Varco ID must be an integer'),
    body('data_ora').isISO8601().withMessage('Data Ora must be a valid date'),
    validateRequest
];

export const validateUpdateTransito = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('veicolo').optional().isString().withMessage('Veicolo must be a string'),
    body('varco').optional().isInt().withMessage('Varco must be an integer'),
    body('data_ora').optional().isISO8601().withMessage('Data Ora must be a valid date'),
    validateRequest
];

export const validateDeleteTransito = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];