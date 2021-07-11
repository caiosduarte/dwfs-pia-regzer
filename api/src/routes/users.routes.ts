import { Router, Request } from "express";
import AppError from "../errors/AppError";
import {
    ensureAuthenticated,
} from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import { IUserQueryParams } from "../modules/users/repositories/IUsersRepository";
import ConfirmRegistrationService from "../modules/users/services/ConfirmRegistrationService";
import SendConfirmationMailService from "../modules/users/services/SendConfirmationMailService";
import { decodeToken } from "../modules/users/utils/verifyJwt";
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

function getTokenFromRequest(request: Request) {
    const valueInBody = () => {
        return (
            request.body.token ||
            request.headers["x-access-token"] ||
            request.headers["x-access"] ||
            request.query.token
        );
    };

    const valueInAuthorizationBeared = () => {
        const authorization = request.headers.authorization;
        if (!authorization) return authorization;
        const [, token] = authorization.split(" ");
        return token;
    };

    return valueInAuthorizationBeared() || valueInBody();
}

usersRouter.get("/", async (request, response) => {
    const token = getTokenFromRequest(request);

    const decoded = token && decodeToken(token);

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

    let user;
    if (isQueryParam) {
        // TODO: Checar se parâmetro está null antes de fazer a query
        const users = await usersRepository.findBy({
            email,
            document,
            cellphone,
        });
        user = users?.length == 1 ? users[0] : undefined;
    } else {
        user = await usersRepository.findById(userIdAuthenticated);
    }

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    // TODO: Se tiver o token válido (isAuthenticated), retorna os dados completos, senão apenas o id e as permissões
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
