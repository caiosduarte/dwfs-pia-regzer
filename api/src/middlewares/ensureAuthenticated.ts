import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/users/utils/verifyJwt";

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

    const {sub: id} = verifyToken(token);

    request.user = { id };

    return next();
}
