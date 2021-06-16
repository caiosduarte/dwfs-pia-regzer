import { Router } from "express";
import AppError from "../errors/AppError";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { createUserController } from "../modules/users/controllers";
import UserMap from "../modules/users/mappers/UserMap";
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

export default usersRouter;
