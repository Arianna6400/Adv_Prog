import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTransitoById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateTransito = [
    body('veicolo').isString().withMessage('Veicolo deve essere una stringa'),
    body('varco').isInt({ min: 1 }).withMessage('Varco ID deve essere un intero positivo'),
    body('data_ora').isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateUpdateTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('veicolo').optional().isString().withMessage('Veicolo deve essere una stringa'),
    body('varco').optional().isInt({ min: 1 }).withMessage('Varco deve essere un intero positivo'),
    body('data_ora').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

export const validateDeleteTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];