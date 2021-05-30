import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import authConfig from "../config/auth";
import UsersRepository from "../repositories/implementations/UsersRepository";

interface TokenPayload {
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
        throw new AppError("JWT token is missing.", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: userId } = verify(
            token,
            authConfig.jwt.refreshTokenSecret
        ) as TokenPayload;

        const usersRepository = UsersRepository.getInstance();

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError("User doesn't exists!", 401);
        }

        if (!user.tokens.find((t) => t.token === token)) {
            throw new AppError("Invalid JWT Token.", 401);
        }

        request.user = {
            id: userId,
        };

        return next();
    } catch {
        throw new AppError("Invalid JWT Token.", 401);
    }
}
