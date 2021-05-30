import { Router } from "express";
import {
    refreshTokenController,
    sendForgotPasswordMailController,
} from "../controllers";
import UsersRepository from "../repositories/implementations/UsersRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", async (request, response) => {
    const { email, password } = request.body;
    const authService = new AuthenticateUserService(
        UsersRepository.getInstance()
    );

    const { user, token, refreshToken } = await authService.execute({
        email,
        password,
    });

    return response.status(200).json({ user, token, refreshToken });
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    return refreshTokenController().handle(request, response);
});

authenticateRoutes.post("/password/forgot", (request, response) => {
    return sendForgotPasswordMailController().handle(request, response);
});

export default authenticateRoutes;
