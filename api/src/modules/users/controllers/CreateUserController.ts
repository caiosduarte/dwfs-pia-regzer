import { Request, Response } from "express";
import UserMap from "../../../mappers";
import CreateUserService from "../services/CreateUserService";
import SendConfirmMailService from "../services/SendConfirmMailService";

export default class CreateUserController {
    constructor(
        private createUserService: CreateUserService,
        private sendConfirmService: SendConfirmMailService
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, document, cellphone, password } = request.body;

        const user = await this.createUserService.execute({
            name,
            document,
            cellphone,
            email,
            password,
        });

        if (!user.confirmedAt) {
            await this.sendConfirmService.execute(email);
        }

        return response.status(201).json(UserMap.toDTO(user));
    }
}
