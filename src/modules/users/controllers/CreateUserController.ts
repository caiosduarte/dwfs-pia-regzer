import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {
    constructor(private createUserService: CreateUserService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, document, cellphone, password } = request.body;

        const user = await this.createUserService.execute({
            name,
            document,
            cellphone,
            email,
            password,
        });

        return response.status(201).json(user);
    }
}
