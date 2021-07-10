import { Router } from "express";
import {
    resetPasswordController,
    sendForgotPasswordMailController,
} from "../modules/users/controllers";
import IMailProvider from "../modules/users/providers/IMailProvider";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "../providers/MailProvider/implementations/SESMailProvider";
import SESSMTPMailProvider from "../providers/MailProvider/implementations/SESSMTPMailProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const passwordRoutes = Router();

function mailProvider(): IMailProvider {
    switch (process.env.MAIL_PROVIDER) {
        case "ethereal":
            return EtherealMailProvider.getInstance();
        case "ses":
            return SESMailProvider.getInstance();
        case "smtp":
        default:
            return SESSMTPMailProvider.getInstance();
    }
}

passwordRoutes.post("/forgot", (request, response) => {
    const usersRepository = UsersRepository.getInstance();
    const tokensRepository = TokensRepository.getInstance();
    const mail = mailProvider();
    const dateProvider = DayjsProvider.getInstance();

    return sendForgotPasswordMailController(
        usersRepository,
        tokensRepository,
        mail,
        dateProvider
    ).handle(request, response);
});

passwordRoutes.post("/reset", (request, response) => {
    const repository = TokensRepository.getInstance();

    return resetPasswordController(repository).handle(request, response);
});

export default passwordRoutes;
