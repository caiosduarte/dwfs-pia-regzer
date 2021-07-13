import { Router, Request } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import IUser from "../modules/users/models/IUser";
import { IUserQueryParams } from "../modules/users/repositories/IUsersRepository";
import ConfirmRegistrationService from "../modules/users/services/ConfirmRegistrationService";
import SendConfirmationMailService from "../modules/users/services/SendConfirmationMailService";
import { isTokenExpired } from "../modules/users/utils/token";
import {
    decodeJwt,
    verifyRefreshToken,
} from "../modules/users/utils/verifyJwt";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import TokensRepository from "../repositories/TokensRepository";
import UsersRepository from "../repositories/UsersRepository";

const usersRouter = Router();

usersRouter.post("/", (request, response) => {
    const repository = UsersRepository.getInstance();
    return createUserController(repository).handle(request, response);
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

function getTokenFromRequest(request: Request): string | undefined {
    const valueInBody = () => {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers["x-access-token"] ||
            request.headers["x-access"];
        if (token) {
            return String(token);
        }
    };

    const valueInAuthorizationBeared = () => {
        const authorization = request.headers.authorization;
        if (authorization) {
            const [, token] = authorization.split(" ");
            return token;
        }
    };

    return valueInAuthorizationBeared() || valueInBody();
}

usersRouter.get("/", async (request, response) => {
    const token = getTokenFromRequest(request);

    const decoded = token && decodeJwt(token);

    const userIdAuthenticated = decoded && decoded.sub;

    const { email, document, cellphone } = request.query as IUserQueryParams;

    const isQueryParam = !!email || !!document || !!cellphone;
    const isAuthenticated = !!userIdAuthenticated;

    if (!isQueryParam && !isAuthenticated) {
        throw new AppError(
            "No query params or authorization header found!",
            403
        );
    }

    const usersRepository = UsersRepository.getInstance();

    const findUser = async () => {
        if (isQueryParam) {
            // TODO: Checar se parâmetro está null antes de fazer a query
            const users = await usersRepository.findBy({
                email,
                document,
                cellphone,
            });
            return users && users[0];
        } else if (userIdAuthenticated) {
            return await usersRepository.findById(userIdAuthenticated);
        }
    };

    const user = await findUser();

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    const hasRefreshTokenValid = () =>
        !!user.tokens?.find((refreshToken) => {
            if (!isTokenExpired(refreshToken.expiresAt)) {
                try {
                    if (!!verifyRefreshToken(refreshToken.token)) {
                        return refreshToken;
                    }
                } catch {}
            }
        });

    if (!hasRefreshTokenValid()) {
        throw new AppError("Last entrance is too long or not found.", 401);
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
