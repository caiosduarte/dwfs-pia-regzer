import { Router } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import IUserResponseDTO from "../modules/users/dtos/IUserResponseDTO";
import UserMap from "../modules/users/mappers/UserMap";
import IUser from "../modules/users/models/IUser";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";
import ConfirmUserService from "../modules/users/services/ConfirmUserService";
import SendConfirmMailService from "../modules/users/services/SendConfirmMailService";

import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";

import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";
import mailProvider from "../utils/mailProvider";

import { getTokenFromRequest } from "../modules/users/utils/token";

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

interface IIDs {
    email?: string;
    document?: string;
    cellphone?: string;
    id?: string;
}

interface ISearch extends IIDs {
    offset?: string;
    start?: string;
}

const hasAnyId = ({ email, document, cellphone, id }: IIDs) => {
    return !!email || !!document || !!cellphone || !!id;
};

const findUsers = async (query: ISearch, repository: IUsersRepository) => {
    const { email, document, cellphone, start, offset } = query;
    if (hasAnyId(query)) {
        return await repository.findBy({
            email,
            document,
            cellphone,
        });
    } else {
        const start = Number(query.start);
        const offset = Number(query.offset);
        return await repository.find({ start, offset });
    }
};

usersRouter.get("/", ensureAuthenticated, async (request, response) => {
    const repository = UsersRepository.getInstance();

    const query = request.query as ISearch;

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
