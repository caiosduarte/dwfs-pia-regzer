import { Router, Request } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import IUser from "../modules/users/models/IUser";
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
            request.query.token
        );
    };

    const valueInAuthorization = () => {
        const authorization = request.headers.authorization;
        if (!authorization) return authorization;
        const [, token] = authorization.split(" ");
        return token;
    };

    return valueInBody() || valueInAuthorization();
}

usersRouter.get("/", async (request, response) => {
    const token = getTokenFromRequest(request);

    if (token) {
        await ensureAuthenticated(request, response, () => {});
    }
    const userAuthenticated = request.user;
    const { email, document, cellphone } = request.query;

    const isQueryParam = !!email || !!document || !!cellphone;
    const isAuthenticated = !!userAuthenticated;

    if (!isQueryParam && !isAuthenticated) {
        throw new AppError(
            "No query params or authorization header found!",
            403
        );
    }

    const usersRepository = UsersRepository.getInstance();

    let user;

    if (isQueryParam) {
        // TODO: Fazer um método que obtenha o usuário com os 03 parâmetros: email, document e cellphone
        user = await usersRepository.findByEmail(String(email));
    } else {
        user = await usersRepository.findById(userAuthenticated.id);
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
