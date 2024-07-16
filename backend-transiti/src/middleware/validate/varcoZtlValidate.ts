import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Middleware di validazione per il get
 */
export const validateHandleVarcoZtlRequests = [
    param('id').optional().isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di creazione di un nuovo varco
 */
export const validateCreateVarcoZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').isInt({ min: 1 }).withMessage('Zona ZTL ID deve essere un intero positivo'),
    body('orario_chiusura').isInt({ min: 1 }).withMessage('Orario Chiusura ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di modifica di un varco esistente
 */
export const validateUpdateVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').optional().isInt({ min: 1 }).withMessage('Zona ZTL ID deve essere un intero positivo'),
    body('orario_chiusura').optional().isInt({ min: 1 }).withMessage('Orario Chiusura ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di eliminazione di un varco esistente
 */
export const validateDeleteVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
