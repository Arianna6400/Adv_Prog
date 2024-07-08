import { body, param } from "express-validator";
import validateRequest from "./validateRequestMiddleware";

export const validateGetOrarioChiusuraById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateOrarioChiusura = [
    body('giorni_settimana_festivi').isString().withMessage('Giorni Settimana Festivi must be a string'),
    body('fascia_oraria_F').isISO8601().withMessage('Fascia Oraria F must be a valid date'),
    body('fascia_oraria_L').isISO8601().withMessage('Fascia Oraria L must be a valid date'),
    body('tariffa_F').isFloat().withMessage('Tariffa F must be a float'),
    body('tariffa_L').isFloat().withMessage('Tariffa L must be a float'),
    validateRequest
];

export const validateUpdateOrarioChiusura = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('giorni_settimana_festivi').optional().isString().withMessage('Giorni Settimana Festivi must be a string'),
    body('fascia_oraria_F').optional().isISO8601().withMessage('Fascia Oraria F must be a valid date'),
    body('fascia_oraria_L').optional().isISO8601().withMessage('Fascia Oraria L must be a valid date'),
    body('tariffa_F').optional().isFloat().withMessage('Tariffa F must be a float'),
    body('tariffa_L').optional().isFloat().withMessage('Tariffa L must be a float'),
    validateRequest
];

export const validateDeleteOrarioChiusura = [
    param('id').isInt().withMessage('ID must be an integer'), 
    validateRequest
];