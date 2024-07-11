import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateGetMultaById = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];

export const validateDownloadBollettino = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];
