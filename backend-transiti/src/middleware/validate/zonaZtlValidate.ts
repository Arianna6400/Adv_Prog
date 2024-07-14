import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetZonaZtlById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validategetZonaZtlWithTransiti = [
    param('id').isInt({ min: 1 }).withMessage('ID zona deve essere un intero positivo'),
    validateRequest
]

export const validateCreateZonaZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

export const validateUpdateZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

export const validateDeleteZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
