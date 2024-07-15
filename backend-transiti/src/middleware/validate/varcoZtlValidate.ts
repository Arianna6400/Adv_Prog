import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Array di middleware di validazione per la rotta di viusalizzazione del varco, dato il suo ID
 */
export const validateGetVarcoZtlById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

/**
 * Array di middleware di validazione per la rotta di visualizzazione del varco dato il suo ID, con i relativ itransiti
 */
export const validategetVarcoZtlWithTransiti = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
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
