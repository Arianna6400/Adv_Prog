import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Middleware di validazione per l'ID della zona ZTL.
 */
export const validateHandleZonaZtlRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di creazione di una nuova zona
 */
export const validateCreateZonaZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di modifica di una zona esistente
 */
export const validateUpdateZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di eliminazione di una zona esistente
 */
export const validateDeleteZonaZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
