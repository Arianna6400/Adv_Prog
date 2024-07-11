import { param, body } from "express-validator";
import validateRequest from './validateRequestMiddleware';

export const validateGetUtenteById = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateCreateUtente = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('email').isEmail().withMessage('Email deve essere un indirizzo valido'),
    validateRequest
];

export const validateUpdateUtente = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
    validateRequest
];

export const validateDeleteUtente = [
    param('id').isInt().withMessage('ID deve essere uun intero'),
    validateRequest
];