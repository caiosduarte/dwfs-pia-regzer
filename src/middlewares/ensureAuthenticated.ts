import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import AppError from "../errors/AppError";
import authConfig from "../modules/users/config/auth";

interface IPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError("JWT is missing.", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const jwt = verify(token, authConfig.jwt.tokenSecret) as IPayload;

        if (jwt.exp === undefined || jwt.exp === null) {
            throw new AppError(`JWT expired: ${jwt.exp}`, 401);
        }

        request.user = {
            id: jwt.sub,
        };

        return next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            throw new AppError(`JWT expired at ${err.expiredAt}`, 401);
        } else {
            throw new AppError("JWT invalid.", 401);
        }
    }
}
