import { param } from 'express-validator';
import validateRequest from './validateRequestMiddleware';

/**
 * Array di middleware di validazione per la rotta di download del bollettino multa
 */
export const validateHandleMulteRequests = [
    param('uuid').optional().isUUID().withMessage('UUID deve essere un UUID valido'),
    validateRequest
];
