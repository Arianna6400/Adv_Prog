import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetVarcoZtlById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateVarcoZtl = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').isInt({ min: 1 }).withMessage('Zona ZTL ID deve essere un intero positivo'),
    body('orario_chiusura').isInt({ min: 1 }).withMessage('Orario Chiusura ID deve essere un intero positivo'),
    validateRequest
];

export const validateUpdateVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('via').optional().isString().withMessage('Via deve essere una stringa'),
    body('zona_ztl').optional().isInt({ min: 1 }).withMessage('Zona ZTL ID deve essere un intero positivo'),
    body('orario_chiusura').optional().isInt({ min: 1 }).withMessage('Orario Chiusura ID deve essere un intero positivo'),
    validateRequest
];

export const validateDeleteVarcoZtl = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
