import { body, param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

// Espressione regolare per validare la targa del veicolo
const targaRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;

export const validateGetVeicoloById = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa must be a valid vehicle registration number'),
    validateRequest
];

export const validateCreateVeicolo = [
    body('targa')
        .matches(targaRegex)
        .withMessage('Targa must be a valid vehicle registration number'),
    body('esente').isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').isInt().withMessage('Tipo Veicolo ID must be an integer'),
    body('utente').isInt().withMessage('Utente ID must be an integer'),
    validateRequest
];

export const validateUpdateVeicolo = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa must be a valid vehicle registration number'),
    body('esente').optional().isBoolean().withMessage('Esente must be a boolean'),
    body('tipo_veicolo').optional().isInt().withMessage('Tipo Veicolo ID must be an integer'),
    body('utente').optional().isInt().withMessage('Utente ID must be an integer'),
    validateRequest
];

export const validateDeleteVeicolo = [
    param('targa')
        .matches(targaRegex)
        .withMessage('Targa must be a valid vehicle registration number'),
    validateRequest
];
