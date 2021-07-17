import { Router } from "express";
import {
    resetPasswordController,
    sendForgotPasswordMailController,
} from "../modules/users/controllers";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";
import mailProvider from "../utils/mailProvider";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", (request, response) => {
    const usersRepository = UsersRepository.getInstance();
    const tokensRepository = TokensRepository.getInstance();
    const dateProvider = DayjsProvider.getInstance();

    return sendForgotPasswordMailController(
        usersRepository,
        tokensRepository,
        mailProvider(),
        dateProvider
    ).handle(request, response);
});

passwordRoutes.patch("/reset", (request, response) => {
    const repository = TokensRepository.getInstance();

    return resetPasswordController(repository).handle(request, response);
});

export default passwordRoutes;
