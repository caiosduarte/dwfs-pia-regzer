import { Router } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import IUserResponseDTO from "../modules/users/dtos/IUserResponseDTO";
import UserMap from "../modules/users/mappers/UserMap";
import IUser from "../modules/users/models/IUser";
import ConfirmUserService from "../modules/users/services/ConfirmUserService";
import SendConfirmMailService from "../modules/users/services/SendConfirmMailService";
import UpdateUserService from "../modules/users/services/UpdateUserService";
import {
    findUsers,
    hasAnyId,
    IUserSearch,
} from "../modules/users/utils/request";

import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import PeopleRepository from "../repositories/PeopleRepository";

import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";
import mailProvider from "../utils/mailProvider";

const usersRouter = Router();

usersRouter.post("/", (request, response) => {
    const usersRepo = UsersRepository.getInstance();
    const tokensRepo = TokensRepository.getInstance();
    const dateProvider = DayjsProvider.getInstance();

    return createUserController(
        usersRepo,
        tokensRepo,
        mailProvider(),
        dateProvider
    ).handle(request, response);
});

usersRouter.get("/:id", ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findById(id);

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    return response.json(UserMap.toDTO(user));
});

usersRouter.get("/", ensureAuthenticated, async (request, response) => {
    const repository = UsersRepository.getInstance();

    const query = request.query as IUserSearch;

    const users = await findUsers(query, repository).then((users) =>
        users?.reduce(
            (dtos: IUserResponseDTO[], user: IUser) => [
                ...dtos,
                UserMap.toDTO(user),
            ],
            []
        )
    );

    if (!users) {
        throw new AppError("User not found.", 404);
    }

    return response.json(users);
});

usersRouter.put("/:id", ensureAuthenticated, async (request, response) => {
    const { id } = request.params;

    const values = request.body;

    const repository = UsersRepository.getInstance();

    const service = new UpdateUserService(
        repository
        // PeopleRepository.getInstance()
    );

    await service.execute({ id, ...values });

    return response.status(204).send();
});

usersRouter.post("/confirm", async (request, response) => {
    const { email } = request.body;
    if (hasAnyId({ email })) {
        const usersRepository = UsersRepository.getInstance();
        const tokensRepository = TokensRepository.getInstance();

        const dateProvider = DayjsProvider.getInstance();

        const service = new SendConfirmMailService(
            usersRepository,
            tokensRepository,
            mailProvider(),
            dateProvider
        );

        await service.execute(email);

        return response.status(201).send();
    }
    throw new AppError("No ID found.", 403);
});

usersRouter.patch("/confirm", async (request, response) => {
    const { token } = request.query;
    console.log("Token request ", String(token));

    const repository = TokensRepository.getInstance();

    const service = new ConfirmUserService(repository);

    await service.execute(String(token));

    return response.status(204).send();
});

export default usersRouter;
