import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetMultaById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateMulta = [
    body('transito').isInt().withMessage('Transito ID must be an integer'),
    body('data_multa').optional().isISO8601().withMessage('Data Multa must be a valid date'),
    body('pagata').isBoolean().withMessage('Pagata must be a boolean'),
    body('importo_token').isFloat().withMessage('Importo Token must be a float'),
    body('uuid_pagamento').isUUID().withMessage('UUID Pagamento must be a valid UUID'),
    validateRequest
];

export const validateUpdateMulta = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('transito').optional().isInt().withMessage('Transito ID must be an integer'),
    body('data_multa').optional().isISO8601().withMessage('Data Multa must be a valid date'),
    body('pagata').optional().isBoolean().withMessage('Pagata must be a boolean'),
    body('importo_token').optional().isFloat().withMessage('Importo Token must be a float'),
    body('uuid_pagamento').optional().isUUID().withMessage('UUID Pagamento must be a valid UUID'),
    validateRequest
];

export const validateDeleteMulta = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateGetMulteNonPagate = [
    param('veicolo').isString().withMessage('Veicolo must be a string'),
    validateRequest
];

export const validateDownloadBollettino = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];
