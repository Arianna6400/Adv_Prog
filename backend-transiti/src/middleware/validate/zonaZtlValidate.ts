import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetZonaZtlById = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateCreateZonaZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

export const validateUpdateZonaZtl = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

export const validateDeleteZonaZtl = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];
