import { Request, Response, NextFunction } from "express";
import UserError from "../errors/UserError";
import authConfig from "../config/auth";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new UserError("JWT token is missing.", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };
        return next();
    } catch (err) {
        throw new UserError("Invalid JWT Token.", 401);
    }
}
