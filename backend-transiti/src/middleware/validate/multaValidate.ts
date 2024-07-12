import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateDownloadBollettino = [
    param('id').isInt({ min: 1 }).withMessage('ID deve essere un intero positivo'),
    validateRequest
];
