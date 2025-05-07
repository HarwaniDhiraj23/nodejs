import { Response } from 'express';

export const successResponse = (res: Response, statusCode: number, success: boolean, message: string, data: any = null, meta: any = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        meta,
    });
};

export const errorResponse = (res: Response, statusCode: number, message: string, errorCode?: string, errorDetails?: any) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errorCode,
        errorDetails,
        data: null,
    });
};
