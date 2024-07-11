import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTipoVeicoloById = [
    param('id').isInt().withMessage('ID deve essere un intero'), 
    validateRequest
];

export const validateCreateTipoVeicolo = [
    body('descrizione').isString().withMessage('Descrizione deve essere una stringa'),
    body('tariffa_base').isFloat().withMessage('Tariffa Base deve essere un float'),
    validateRequest
];

export const validateUpdateTipoVeicolo = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('tariffa_base').optional().isFloat().withMessage('Tariffa Base deve essere una stringa'),
    validateRequest
];

export const validateDeleteTipoVeicolo = [
    param('id').isInt().withMessage('ID deve essere un intero'), 
    validateRequest
];