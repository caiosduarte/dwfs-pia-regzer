import { decode, TokenExpiredError, verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import auth from "../config/auth";

interface IPayload {
    sub: string;
    iat: number;
    exp: number;

    isAdmin: boolean;
    roles?: string[];
    permissions?: string[];

    email?: string;
    document?: string;
    cellphone?: string;
}

function verifyJwt(token: string, secret: string): IPayload {
    try {
        const jwt = verify(token, secret) as IPayload;

        if (!jwt.exp || typeof jwt.exp !== "number") {
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

export function verifyToken(token: string): IPayload {
    return verifyJwt(token, auth.jwt.tokenSecret);
}

export function verifyRefreshToken(token: string): IPayload {
    return verifyJwt(token, auth.jwt.refreshTokenSecret);
}

export function decodeToken(token: string): IPayload {
    return decode(token) as IPayload;
}


