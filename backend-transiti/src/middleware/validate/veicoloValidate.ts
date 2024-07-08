import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetVeicoloById = [
    param('targa').isString().withMessage('Targa must be a string'),
    validateRequest
];

export const validateCreateVeicolo = [
    body('targa').isString().withMessage('Targa must be a string'),
    body('esente').isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').isInt().withMessage('Tipo Veicolo ID must be an integer'),
    body('utente').isInt().withMessage('Utente ID must be an integer'),
    validateRequest
];

export const validateUpdateVeicolo = [
    param('targa').isString().withMessage('Targa must be a string'),
    body('esente').optional().isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').optional().isInt().withMessage('Tipo Veicolo ID must be un integer'),
    body('utente').optional().isInt().withMessage('Utente ID must be un integer'),
    validateRequest
];

export const validateDeleteVeicolo = [
    param('targa').isString().withMessage('Targa must be a string'),
    validateRequest
];
