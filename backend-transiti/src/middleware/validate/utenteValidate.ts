import { param, body } from "express-validator";
import validateRequest from './validateRequestMiddleware';

export const validateGetUtenteById = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];

export const validateCreateUtente = [
    body('nome').isString().withMessage('Nome deve essere una stringa'),
    body('email').isEmail().withMessage('Email deve essere un indirizzo valido'),
    validateRequest
];

export const validateUpdateUtente = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    body('nome').optional().isString().withMessage('Nome deve essere una stringa'),
    body('email').optional().isEmail().withMessage('Email deve essere un indirizzo valido'),
    validateRequest
];

export const validateDeleteUtente = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];