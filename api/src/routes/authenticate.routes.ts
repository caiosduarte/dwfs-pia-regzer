import { Router } from "express";
import AppError from "../errors/AppError";

import {
    authenticateUserController,
    refreshTokenController,
} from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import {
    createRefreshToken,
    createToken,
} from "../modules/users/utils/createJwt";
import { hasAnyId, IUserIDs } from "../modules/users/utils/request";
import {
    getTokenFromRequest,
    getUserIdsFromRequest,
} from "../modules/users/utils/request";
import { isRefreshTokenValid, verifyToken } from "../modules/users/utils/token";

import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

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

    const repository = UsersRepository.getInstance();

    const { id, email, cellphone, document } = ids;

    const user = id
        ? await repository.findById(id)
        : await repository
              .findByIds({ id, email, cellphone, document })
              .then((users) => users && users[0])
              .then((user) => {
                  if (!user) throw new AppError("User not found.", 404);
                  const tokens = user?.tokens;
                  const isValid = !!tokens?.find((token) => {
                      return isRefreshTokenValid(
                          { email, cellphone, document },
                          token
                      );
                  });

                  if (isValid) {
                      return user;
                  }
                  throw new AppError("User unauthorized.", 401);
              });

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    return response.json(UserMap.toDTO(user));
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    const repository = TokensRepository.getInstance();
    return refreshTokenController(repository).handle(request, response);
});

export default authenticateRoutes;
