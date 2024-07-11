import { body, param } from "express-validator";
import validateRequest from "./validateRequestMiddleware";

export const validateGetOrarioChiusuraById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateOrarioChiusura = [
    body('giorni_settimana_festivi').isString().withMessage('Giorni Settimana Festivi deve essere una stringa'),
    body('orario_inizio_F').isISO8601().withMessage('Orario Inizio F deve essere una data valida'),
    body('orario_fine_F').isISO8601().withMessage('Orario Fine F deve essere una data valida'),
    body('orario_inizio_L').isISO8601().withMessage('Orario Inizio L deve essere una data valida'),
    body('orario_inizio_L').isISO8601().withMessage('Orario Fine L deve essere una data valida'),
    body('tariffa_F').isFloat().withMessage('Tariffa F deve essere un float'),
    body('tariffa_L').isFloat().withMessage('Tariffa L deve essere un float'),
    validateRequest
];

export const validateUpdateOrarioChiusura = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('giorni_settimana_festivi').optional().isString().withMessage('Giorni Settimana Festivi deve essere una stringa'),
    body('orario_inizio_F').optional().isISO8601().withMessage('Orario Inizio F deve essere una data valida'),
    body('orario_fine_F').optional().isISO8601().withMessage('Orario Fine F deve essere una data valida'),
    body('orario_inizio_L').optional().isISO8601().withMessage('Orario Inizio L deve essere una data valida'),
    body('orario_inizio_L').optional().isISO8601().withMessage('Orario Fine L deve essere una data valida'),
    body('tariffa_F').optional().isFloat().withMessage('Tariffa F deve essere un float'),
    body('tariffa_L').optional().isFloat().withMessage('Tariffa L deve essere un float'),
    validateRequest
];

export const validateDeleteOrarioChiusura = [
    param('id').isInt().withMessage('ID deve essere un intero'), 
    validateRequest
];