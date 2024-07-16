import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Middleware di validazione per l'ID del transito.
 */
export const validateHandleTransitoRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di visualizzaziocreazione di un nuovo transito
 */
export const validateCreateTransito = [
    body('veicolo').isString().withMessage('Veicolo deve essere una stringa'),
    body('varco').isInt({ min: 1 }).withMessage('Varco ID deve essere un intero positivo'),
    body('data_ora').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di modifica di un transito esistente
 */
export const validateUpdateTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('veicolo').optional().isString().withMessage('Veicolo deve essere una stringa'),
    body('varco').optional().isInt({ min: 1 }).withMessage('Varco deve essere un intero positivo'),
    body('data_ora').optional().isISO8601().withMessage('Data Ora deve essere una data valida'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di eliminazione di un transito esistente
 */
export const validateDeleteTransito = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];