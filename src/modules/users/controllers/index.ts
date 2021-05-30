import UsersRepository from "../repositories/implementations/UsersRepository";
import CreateUserService from "../services/CreateUserService";
import RefreshTokenService from "../services/RefreshTokenService";
import SendForgotPasswordMailService from "../services/SendForgotPasswordMailService";
import EtherealEmailProvider from "../utils/implementations/EtherealMailProvider";
import CreateUserController from "./CreateUserController";
import RefreshTokenController from "./RefreshTokenController";
import SendForgotPasswordMailController from "./SendForgotPasswordMailController";

function createUserController() {
    const repository = UsersRepository.getInstance();
    const service = new CreateUserService(repository);
    const createUserController = new CreateUserController(service);

    return createUserController;
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

export {
    createUserController,
    refreshTokenController,
    sendForgotPasswordMailController,
};
