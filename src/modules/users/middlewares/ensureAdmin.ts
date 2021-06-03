import { NextFunction, Request, Response } from "express";
import AppError from "../../../errors/AppError";
import UsersRepository from "../repositories/implementations/UsersRepository";

export default async function ensureAdmin(
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

    if (!user?.isAdmin) {
        throw new AppError("User is not ADMIN!", 401);
    }

    return next();
}
