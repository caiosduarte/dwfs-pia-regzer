import { Router } from "express";
import AppError from "../errors/AppError";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import ConfirmRegistrationService from "../modules/users/services/ConfirmRegistrationService";
import SendConfirmationMailService from "../modules/users/services/SendConfirmationMailService";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const usersRouter = Router();

usersRouter.post("/", (request, response) => {
    const repository = UsersRepository.getInstance();
    return createUserController(repository).handle(request, response);
});

usersRouter.get("/", ensureAuthenticated, async (request, response) => {
    const { id } = request.user;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findById(id);

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    return response.json(UserMap.toDTO(user));
});

usersRouter.get("/email", async (request, response) => {
    const { email } = request.body;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findByEmail(email);

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    return response.json(UserMap.toDTO(user));
});

usersRouter.post(
    "/confirmation",
    ensureAuthenticated,
    async (request, response) => {
        const { id } = request.user;
        const usersRepository = UsersRepository.getInstance();
        const tokensRepository = TokensRepository.getInstance();
        const mailProvider = EtherealMailProvider.getInstance();
        const dateProvider = DayjsProvider.getInstance();

        const service = new SendConfirmationMailService(
            usersRepository,
            tokensRepository,
            mailProvider,
            dateProvider
        );

        await service.execute(id);

        return response.status(201).send();
    }
);

usersRouter.post("/confirm", async (request, response) => {
    const { token } = request.query;

    const repository = TokensRepository.getInstance();

    const service = new ConfirmRegistrationService(repository);

    await service.execute(String(token));

    return response.status(201).send();
});

export default usersRouter;
