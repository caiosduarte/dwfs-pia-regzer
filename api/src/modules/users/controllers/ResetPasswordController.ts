import { Request, Response } from "express";

import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
    constructor(private service: ResetPasswordService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        await this.service.execute({ tokenEncoded: String(token), password });

        return response.status(204).send();
    }
}
