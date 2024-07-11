import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateDownloadBollettino = [
    param('id').isInt().withMessage('ID deve essere un intero'),
    validateRequest
];
