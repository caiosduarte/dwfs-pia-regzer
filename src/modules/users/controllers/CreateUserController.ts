import CreateUserService from "../services/CreateUserService";

import { Request, Response } from "express";

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

        //delete user.password;
        // TODO ? ao criar como determinar o uri do recurso e retornar no cabeçalho da resposta no atributo "Location"
        return response.status(201).json(user);
    }
}
