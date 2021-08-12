import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthenticateUserController {
    constructor(private service: AuthenticateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, document, cellphone, password, remember } = request.body;

        const { user, token, refreshToken } = await this.service.execute({
            email,
            document,
            cellphone,
            password,
            remember,
        });

        return response.status(201).json({ user, token, refreshToken });
    }
}
