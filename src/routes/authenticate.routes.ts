import { Router } from "express";
import {
    authenticateUserController,
    refreshTokenController,
} from "../modules/users/controllers";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", async (request, response) => {
    const repository = UsersRepository.getInstance();
    const dateProvider = DayjsProvider.getInstance();
    return authenticateUserController(repository, dateProvider).handle(
        request,
        response
    );
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    const repository = TokensRepository.getInstance();
    return refreshTokenController(repository).handle(request, response);
});

export default authenticateRoutes;
