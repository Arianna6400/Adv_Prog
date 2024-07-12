import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetTipoVeicoloById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateTipoVeicolo = [
    body('descrizione').isString().withMessage('Descrizione deve essere una stringa'),
    body('tariffa_base').isFloat({ gt: 0 }).withMessage('Tariffa Base deve essere un float non negativo'),
    validateRequest
];

export const validateUpdateTipoVeicolo = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    body('descrizione').optional().isString().withMessage('Descrizione deve essere una stringa'),
    body('tariffa_base').optional().isFloat({ gt: 0 }).withMessage('Tariffa Base deve essere un float non negativo'),
    validateRequest
];

export const validateDeleteTipoVeicolo = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];