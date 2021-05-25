import { Router } from "express";

import { AuthenticateUserService } from "../services/AuthenticateUserService";
import UsersRepository from "../repositories/implementations/UsersRepository";

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
    const { email, password } = request.body;
    const authService = new AuthenticateUserService(
        UsersRepository.getInstance()
    );

    const { user, token } = await authService.execute({ email, password });

    //delete user.password;

    return response.status(200).json({ user, token });
});

export default sessionsRouter;
