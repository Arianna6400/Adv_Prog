import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetZonaZtlById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateZonaZtl = [
    body('nome').isString().withMessage('Nome must be a string'),
    validateRequest
];

export const validateUpdateZonaZtl = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('nome').optional().isString().withMessage('Nome must be a string'),
    validateRequest
];

export const validateDeleteZonaZtl = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];
