import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
    const { name, email, cpf, password } = request.body;

    const createService = new CreateUserService();

    const user = await createService.execute({
        name,
        cpf,
        email,
        password,
    });

    delete user.password;
    // TODO ? ao criar como determinar o uri do recurso e retornar no cabeçalho da resposta no atributo "Location"
    return response.status(201).json(user);
});

export default usersRouter;
