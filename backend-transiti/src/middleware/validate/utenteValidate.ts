import { param, body } from "express-validator";
import validateRequest from './validateRequestMiddleware';

export const validateGetUtenteById = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];

export const validateCreateUtente = [
    body('nome').isString().withMessage('Nome must be a string'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    validateRequest
];

export const validateUpdateUtente = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('nome').optional().isString().withMessage('Nome must be a string'),
    body('email').optional().isEmail().withMessage('Email must be a valid email address'),
    validateRequest
];

export const validateDeleteUtente = [
    param('id').isInt().withMessage('ID must be an integer'),
    validateRequest
];