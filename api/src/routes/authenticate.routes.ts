import { Router } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import {
    authenticateUserController,
    refreshTokenController,
} from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";

import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", async (request, response) => {
    const usersRepo = UsersRepository.getInstance();
    const tokensRepo = TokensRepository.getInstance();
    const dateProvider = DayjsProvider.getInstance();
    return authenticateUserController(
        usersRepo,
        tokensRepo,
        dateProvider
    ).handle(request, response);
});

authenticateRoutes.get(
    "/sessions",
    ensureAuthenticated,
    async (request, response) => {
        const { id } = request.params;

        const usersRepository = UsersRepository.getInstance();

        const user = await usersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        return response.json(UserMap.toDTO(user));
    }
);

authenticateRoutes.post("/refresh-token", (request, response) => {
    const repository = TokensRepository.getInstance();
    return refreshTokenController(repository).handle(request, response);
});

export default authenticateRoutes;
