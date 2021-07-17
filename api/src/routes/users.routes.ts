import { Router, Request } from "express";
import AppError from "../errors/AppError";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";
import ConfirmUserService from "../modules/users/services/ConfirmUserService";
import SendConfirmMailService from "../modules/users/services/SendConfirmMailService";
import { decodeJwt } from "../modules/users/utils/verifyJwt";
import DayjsProvider from "../providers/DateProvider/implementations/DayjsProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
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

interface IIDs {
    email?: string;
    document?: string;
    cellphone?: string;
    id?: string;
}

const hasAnyId = ({ email, document, cellphone, id }: IIDs) => {
    return !!email || !!document || !!cellphone || !!id;
};

const findUser = async (ids: IIDs, repository: IUsersRepository) => {
    if (hasAnyId(ids)) {
        const { id, email, document, cellphone } = ids;
        if (id) {
            return await repository.findById(id);
        } else {
            return await repository
                .findBy({
                    email,
                    document,
                    cellphone,
                })
                .then((result) => result && result[0]);
        }
    }
};

usersRouter.get("/", async (request, response) => {
    const token = getTokenFromRequest(request);

    const decoded = token && decodeJwt(token);

    const id = decoded && decoded.sub;

    const { email, document, cellphone } = request.query as IIDs;

    if (!hasAnyId({ email, document, cellphone, id })) {
        throw new AppError(
            "No query params or authorization header found.",
            403
        );
    }

    const usersRepository = UsersRepository.getInstance();

    const user = await findUser(
        { id, email, document, cellphone },
        usersRepository
    );

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    return response.json(UserMap.toDTO(user));
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
