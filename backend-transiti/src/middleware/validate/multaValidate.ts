import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetMultaById = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateCreateMulta = [
    body('transito').isInt().withMessage('Transito ID deve essere un intero'),
    body('data_multa').optional().isISO8601().withMessage('Data Multa deve essere una data valida'),
    body('pagata').isBoolean().withMessage('Pagata deve essere un booleano'),
    body('importo_token').isFloat().withMessage('Importo Token deve essere un float'),
    body('uuid_pagamento').isUUID().withMessage('UUID Pagamento deve essere un UUID valido'),
    validateRequest
];

export const validateUpdateMulta = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    body('transito').optional().isInt().withMessage('Transito ID deve essere un intero'),
    body('data_multa').optional().isISO8601().withMessage('Data Multa deve essere una data valida'),
    body('pagata').optional().isBoolean().withMessage('Pagata deve essere un booleano'),
    body('importo_token').optional().isFloat().withMessage('Importo Token deve essere un float'),
    body('uuid_pagamento').optional().isUUID().withMessage('UUID Pagamento deve essere un UUID valido'),
    validateRequest
];

export const validateDeleteMulta = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateGetMulteNonPagate = [
    param('veicolo').isString().withMessage('Veicolo deve essere una stringa'),
    validateRequest
];

export const validateDownloadBollettino = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];
