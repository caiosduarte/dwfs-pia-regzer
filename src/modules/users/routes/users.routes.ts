import { Router } from "express";
import { createUserController } from "../controllers";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersRepository from "../repositories/implementations/UsersRepository";

const usersRouter = Router();

//usersRouter.use(ensureAuthenticated);

usersRouter.post("/", (request, response) => {
    return createUserController().handle(request, response);
});

usersRouter.get("/", ensureAuthenticated, async (request, response) => {
    //const { id } = request.params;

    const { id } = request.user;

    const usersRepository = UsersRepository.getInstance();
    const user = await usersRepository.findById(id);

    return response.json(user);
});

export default usersRouter;
