import { Request, Response } from "express";
import SendForgotPasswordMailService from "../services/SendForgotPasswordMailService";

export default class SendForgotPasswordMailController {
    constructor(private service: SendForgotPasswordMailService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        await this.service.execute(email);

        return response.status(201).send();
    }
}
