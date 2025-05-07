import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { errorResponse } from '../utils/responseHelper';
import { COMMON_MESSAGES } from '../constants/messages';

interface ValidationSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

export const validateRequest = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const allErrors: any[] = [];

        if (schemas.body) {
            const { error } = schemas.body.validate(req.body, { abortEarly: false });
            if (error) {
                allErrors.push(
                    ...error.details.map(detail => ({
                        message: detail.message.replace(/\"([^"]+)\"/g, '$1'),
                        path: detail.path.join('.'),
                    }))
                );
            }
        }

        if (schemas.params) {
            const { error } = schemas.params.validate(req.params, { abortEarly: false });
            if (error) {
                allErrors.push(
                    ...error.details.map(detail => ({
                        message: detail.message.replace(/\"([^"]+)\"/g, '$1'),
                        path: `params.${detail.path.join('.')}`,
                    }))
                );
            }
        }

        if (schemas.query) {
            const { error } = schemas.query.validate(req.query, { abortEarly: false });
            if (error) {
                allErrors.push(
                    ...error.details.map(detail => ({
                        message: detail.message.replace(/\"([^"]+)\"/g, '$1'),
                        path: `query.${detail.path.join('.')}`,
                    }))
                );
            }
        }

        if (allErrors.length > 0) {
            errorResponse(res, 400, COMMON_MESSAGES.VALIDATION_FAILED, undefined, allErrors);
            return;
        }

        next();
    };
};

