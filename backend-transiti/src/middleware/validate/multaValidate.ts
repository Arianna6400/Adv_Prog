import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

export const validateDownloadBollettino = [
    param('uuid').isUUID().withMessage('UUID deve essere un UUID valido'),
    validateRequest
];
