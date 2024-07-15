import { param, body } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Array di middleware di validazione per la rotta di visualizzazione di una zona, dato il suo ID
 */
export const validateGetZonaZtlById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di visualizzazione di una zona, dato il suo ID, con i relativi transiti
 */
export const validategetZonaZtlWithTransiti = [
    param('id').isInt({ min: 1 }).withMessage('ID zona deve essere un intero positivo'),
    validateRequest
]

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
