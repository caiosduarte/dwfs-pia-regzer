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
        // ??? como incluir informações de um token válido decodificado (exemplo usuario_id) na request sem typescript (ou sem sobreescrever [ou anexar] o tipo da biblioteca do Express), ou seja, qual a melhor prática para incluir uma informação na request com javascript puro
        request.user = {
            id: sub,
        };
        return next();
    } catch (err) {
        throw new UserError("Invalid JWT Token.", 401);
    }
}
