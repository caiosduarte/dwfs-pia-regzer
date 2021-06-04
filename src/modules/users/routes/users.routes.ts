import { Router } from "express";
import AppError from "../../../errors/AppError";
import { createUserController } from "../controllers";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersRepository from "../repositories/implementations/UsersRepository";

const usersRouter = Router();

usersRouter.post("/", (request, response) => {
    return createUserController().handle(request, response);
});

usersRouter.get("/", ensureAuthenticated, async (request, response) => {
    const { id } = request.user;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findById(id);

    return response.json(user);
});

usersRouter.get("/email", async (request, response) => {
    const { email } = request.body;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findByEmail(email);

    if (!user) {
        throw new AppError("User not found!", 404);
    }

    return response.json(user);
});

export default usersRouter;
