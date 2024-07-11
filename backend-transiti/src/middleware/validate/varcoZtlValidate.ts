import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetVarcoZtlById = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateCreateVarcoZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').isInt().withMessage('Zona ZTL ID deve essere un intero'),
    body('orario_chiusura').isInt().withMessage('Orario Chiusura ID deve essere un intero'),
    validateRequest
];

export const validateUpdateVarcoZtl = [
    param('id').isInt().withMessage('ID deve essere uun intero'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').optional().isInt().withMessage('Zona ZTL ID deve essere un intero'),
    body('orario_chiusura').optional().isInt().withMessage('Orario Chiusura ID deve essere un intero'),
    validateRequest
];

export const validateDeleteVarcoZtl = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];
