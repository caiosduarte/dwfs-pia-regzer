import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/UsersRepository";

interface IPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async function ensureConfirmed(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { id } = request.user;

    if (!id) {
        throw new AppError("User is missing!", 401);
    }

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findById(id);

    if (!user?.isConfirmed) {
        throw new AppError("User is not confirmed!", 401);
    }

    return next();
}
