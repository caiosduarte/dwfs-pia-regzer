import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import UserError from "../modules/users/errors/UserError";

function catchAllAsError(err: Error, request: Request, response: Response) {
    let statusCode = 500;
    let errorMessage = "Internal server error.";

    if (err instanceof Error) {
        errorMessage = err.message;
        if (err instanceof AppError) {
            statusCode = err.statusCode;
        } else {
            statusCode = 400;
        }
    }

    console.error(err);

    return response.status(statusCode).json({
        status: statusCode,
        message: errorMessage,
    });
}

function userError(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (err instanceof UserError) {
        throw new AppError(err.message, err.statusCode);
    }

    return next(err);
}

const errors = [userError, catchAllAsError];

export { errors, catchAllAsError };
