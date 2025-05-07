import { NextFunction, Response, Request } from "express";
import { HttpStatus } from "../utils/httpStatus";
import { COMMON_MESSAGES, ErrorType } from "../constants/messages";
import { errorResponse } from "../utils/responseHelper";

export const errorHandler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

    const errorResult = await getErrorResult(err);

    errorResponse(
        res,
        errorResult.statusCode,
        errorResult.errorKey,
        errorResult.errorCode
    );
};


export async function getErrorResult(
    error: any,
): Promise<any> {

    const Error_name: string = error.name;

    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorKey: string = COMMON_MESSAGES.FETCH_ERROR;
    let errorCode: string = Error_name;


    switch (Error_name) {
        case ErrorType.USER_NOT_FOUND:
            statusCode = HttpStatus.NOT_FOUND; // status code of request
            errorKey = COMMON_MESSAGES.USER_NOT_FOUND; //  error message
            break;
        case ErrorType.EMAIL_ALREADY_EXITS:
            statusCode = HttpStatus.CONFLICT_ERROR;
            errorKey = COMMON_MESSAGES.EMAIL_ALREADY_EXITS;
            break;
        case ErrorType.INVALID_OTP:
            statusCode = HttpStatus.BAD_REQUEST;
            errorKey = COMMON_MESSAGES.INVALID_OTP;
            break;
        case ErrorType.EMAIL_NOT_FOUND:
            statusCode = HttpStatus.NOT_FOUND;
            errorKey = COMMON_MESSAGES.EMAIL_NOT_FOUND;
            break;
        case ErrorType.USER_NOT_VERIFIED:
            statusCode = HttpStatus.FORBIDDEN;
            errorKey = COMMON_MESSAGES.USER_NOT_VERIFIED;
            break;
        case ErrorType.INCORRECT_PASSWORD:
            statusCode = HttpStatus.UNAUTHORIZED;
            errorKey = COMMON_MESSAGES.INCORRECT_PASSWORD;
            break;
        case ErrorType.UNAUTHORIZED:
            statusCode = HttpStatus.UNAUTHORIZED;
            errorKey = COMMON_MESSAGES.UNAUTHORIZED;
            break;
        case ErrorType.INVALID_TODO:
            statusCode = HttpStatus.BAD_REQUEST;
            errorKey = COMMON_MESSAGES.INVALID_TODO;
            break;
        case ErrorType.TODO_ALREADY_DELETED:
            statusCode = HttpStatus.BAD_REQUEST;
            errorKey = COMMON_MESSAGES.TODO_ALREADY_DELETED;
            break;
        case ErrorType.UPLOAD_PROMPT:
            statusCode = HttpStatus.BAD_REQUEST;
            errorKey = COMMON_MESSAGES.UPLOAD_PROMPT;
            break;
        case ErrorType.UPLOAD_FAILED:
            statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            errorKey = COMMON_MESSAGES.UPLOAD_FAILED;
            break;
        case ErrorType.OTP_EXPIRED:
            statusCode = HttpStatus.UNAUTHORIZED;
            errorKey = COMMON_MESSAGES.OTP_EXPIRED;
            break;
        default:
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errorKey = COMMON_MESSAGES.INTERNAL_SERVER_ERROR;
            errorCode = ErrorType.INTERNAL_SERVER_ERROR;
            break;
    }
    return { statusCode, errorKey, errorCode }
}

export const throwError = (type: string) => {
    const error = new Error();
    error.name = type;
    throw error;
};