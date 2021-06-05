import { Router } from "express";
import {
    resetPasswordController,
    sendForgotPasswordMailController,
} from "../modules/users/controllers";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const passwordRoutes = Router();

passwordRoutes.post("/forgot", (request, response) => {
    const usersRepository = UsersRepository.getInstance();
    const tokensRepository = TokensRepository.getInstance();
    const mailProvider = new EtherealMailProvider();
    const dateProvider = DayjsProvider.getInstance();

    return sendForgotPasswordMailController(
        usersRepository,
        tokensRepository,
        mailProvider,
        dateProvider
    ).handle(request, response);
});

passwordRoutes.post("/reset", (request, response) => {
    const repository = TokensRepository.getInstance();

    return resetPasswordController(repository).handle(request, response);
});

export default passwordRoutes;
