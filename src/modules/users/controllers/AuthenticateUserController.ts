import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthenticateUserController {
    constructor(private service: AuthenticateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const { user, token, refreshToken } = await this.service.execute({
            email,
            password,
        });

        return response.status(200).json({ user, token, refreshToken });
    }
}
