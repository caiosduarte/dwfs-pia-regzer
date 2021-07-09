import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import AppError from "../errors/AppError";
import authConfig from "../modules/users/config/auth";

interface IPayload {
    iat: number;
    exp?: number;
    sub: string;
    email?: string;
}

export function verifyToken(token: string, secret: string): IPayload {
    try {
        const jwt = verify(token, secret) as IPayload;

        if (jwt.exp === undefined || jwt.exp === null) {
            throw new AppError(`JWT expiration is not defined.`, 401);
        }
        return jwt;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            throw new AppError(`JWT expired at ${err.expiredAt}.`, 401);
        }
        throw new AppError("JWT invalid.", 401);
    }
}

export function getUserIdByToken(token: string): string {
    const jwt = verifyToken(token, authConfig.jwt.tokenSecret);

    return jwt.sub;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError("JWT is missing.", 401);
    }

    const [, token] = authorization.split(" ");

    const id = getUserIdByToken(token);

    request.user = { id };

    return next();
}
