import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTipoVeicoloById = [
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest
];

export const validateCreateTipoVeicolo = [
    body('descrizione').isString().withMessage('Descrizione must be a string'),
    body('tariffa_base').isFloat().withMessage('Tariffa Base must be a float'),
    validateRequest
];

export const validateUpdateTipoVeicolo = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('descrizione').optional().isString().withMessage('Descrizione must be a string'),
    body('tariffa_base').optional().isFloat().withMessage('Tariffa Base must be a float'),
    validateRequest
];

export const validateDeleteTipoVeicolo = [
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest
];