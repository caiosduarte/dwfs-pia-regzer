import IDateProvider from "../providers/IDateProvider";
import IMailProvider from "../providers/IMailProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import AuthenticateUserService from "../services/AuthenticateUserService";
import CreateUserService from "../services/CreateUserService";
import RefreshTokenService from "../services/RefreshTokenService";
import ResetPasswordService from "../services/ResetPasswordService";
import SendForgotPasswordMailService from "../services/SendForgotPasswordMailService";
import AuthenticateUserController from "./AuthenticateUserController";
import CreateUserController from "./CreateUserController";
import RefreshTokenController from "./RefreshTokenController";
import ResetPasswordController from "./ResetPasswordController";
import SendForgotPasswordMailController from "./SendForgotPasswordMailController";

const createUserController = (
    repository: IUsersRepository
): CreateUserController => {
    const service = new CreateUserService(repository);
    return new CreateUserController(service);
};

function authenticateUserController(
    repository: IUsersRepository,
    tokensRepository: ITokensRepository,
    dateProvider: IDateProvider
): AuthenticateUserController {
    const service = new AuthenticateUserService(
        repository,
        tokensRepository,
        dateProvider
    );
    return new AuthenticateUserController(service);
}

function refreshTokenController(
    repository: ITokensRepository
): RefreshTokenController {
    const service = new RefreshTokenService(repository);
    return new RefreshTokenController(service);
}

const sendForgotPasswordMailController = (
    usersRepository: IUsersRepository,
    tokensRepository: ITokensRepository,
    mailProvider: IMailProvider,
    dateProvider: IDateProvider
) => {
    const service = new SendForgotPasswordMailService(
        usersRepository,
        tokensRepository,
        mailProvider,
        dateProvider
    );

    return new SendForgotPasswordMailController(service);
};

function resetPasswordController(
    repository: ITokensRepository
): ResetPasswordController {
    const service = new ResetPasswordService(repository);
    return new ResetPasswordController(service);
}

export {
    authenticateUserController,
    createUserController,
    refreshTokenController,
    sendForgotPasswordMailController,
    resetPasswordController,
};
