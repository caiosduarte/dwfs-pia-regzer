import TokensRepository from "../repositories/implementations/TokensRepository";
import UsersRepository from "../repositories/implementations/UsersRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import CreateUserService from "../services/CreateUserService";
import RefreshTokenService from "../services/RefreshTokenService";
import ResetPasswordService from "../services/ResetPasswordService";
import SendForgotPasswordMailService from "../services/SendForgotPasswordMailService";
import EtherealEmailProvider from "../utils/implementations/EtherealMailProvider";
import AuthenticateUserController from "./AuthenticateUserController";
import CreateUserController from "./CreateUserController";
import RefreshTokenController from "./RefreshTokenController";
import ResetPasswordController from "./ResetPasswordController";
import SendForgotPasswordMailController from "./SendForgotPasswordMailController";

function createUserController() {
    const repository = UsersRepository.getInstance();
    const service = new CreateUserService(repository);
    const createUserController = new CreateUserController(service);

    return createUserController;
}

function authenticateUserController() {
    const repository = UsersRepository.getInstance();
    const service = new AuthenticateUserService(repository);
    const authenticateUserController = new AuthenticateUserController(service);

    return authenticateUserController;
}

function refreshTokenController() {
    const repository = UsersRepository.getInstance();
    const service = new RefreshTokenService(repository);
    const refreshTokenController = new RefreshTokenController(service);

    return refreshTokenController;
}

const etherealMailProvider = new EtherealEmailProvider();

function sendForgotPasswordMailController() {
    const repository = UsersRepository.getInstance();
    const service = new SendForgotPasswordMailService(
        repository,
        etherealMailProvider
    );
    const sendForgotPasswordMailController =
        new SendForgotPasswordMailController(service);

    return sendForgotPasswordMailController;
}

function resetPasswordController() {
    const repository = TokensRepository.getInstance();
    const service = new ResetPasswordService(repository);
    const resetPasswordController = new ResetPasswordController(service);

    return resetPasswordController;
}

export {
    authenticateUserController,
    createUserController,
    refreshTokenController,
    sendForgotPasswordMailController,
    resetPasswordController,
};
