import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetVarcoZtlById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateVarcoZtl = [
    body('nome').isString().withMessage('Nome must be a string'),
    body('via').optional().isString().withMessage('Via must be a string'),
    body('zona_ztl').isInt().withMessage('Zona ZTL ID must be an integer'),
    body('orario_chiusura').isInt().withMessage('Orario Chiusura ID must be an integer'),
    validateRequest
];

export const validateUpdateVarcoZtl = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('nome').optional().isString().withMessage('Nome must be a string'),
    body('via').optional().isString().withMessage('Via must be a string'),
    body('zona_ztl').optional().isInt().withMessage('Zona ZTL ID must be an integer'),
    body('orario_chiusura').optional().isInt().withMessage('Orario Chiusura ID must be an integer'),
    validateRequest
];

export const validateDeleteVarcoZtl = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];
