import { Router } from "express";
import AppError from "../errors/AppError";

import {
    authenticateUserController,
    refreshTokenController,
} from "../modules/users/controllers";
import UserMap from "../mappers";

import { hasAnyId, IUserIDs } from "../modules/users/utils/request";
import {
    getTokenFromRequest,
} from "../modules/users/utils/request";
import { hasRefreshTokenValid, verifyToken } from "../modules/users/utils/token";

import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", async (request, response) => {
    const usersRepo = UsersRepository.getInstance();
    const tokensRepo = TokensRepository.getInstance();
    const dateProvider = DayjsProvider.getInstance();
    return authenticateUserController(
        usersRepo,
        tokensRepo,
        dateProvider
    ).handle(request, response);
});

authenticateRoutes.get("/sessions", async (request, response) => {
    const token = getTokenFromRequest(request);

    let ids = request.query as IUserIDs;

    if (!hasAnyId(ids)) {
        if (token) {
            const { sub: id } = verifyToken(token);
            ids = { ...ids, id };
        } else {
            throw new AppError("No params.", 403);
        }
    }

    const repository  = UsersRepository.getInstance() as IUsersRepository;

    const { id, email, cellphone, document } = ids;

    const user = await repository.findByIds({ id, email, cellphone, document });

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if(!hasRefreshTokenValid({ email, cellphone, document }, user.tokens)) {
        throw new AppError("User unauthorized.", 401);
    }

    return response.json({ user: UserMap.toDTO(user) });
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    const repository = TokensRepository.getInstance();
    return refreshTokenController(repository).handle(request, response);
});

export default authenticateRoutes;
