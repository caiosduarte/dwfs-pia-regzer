import { Request, Response } from "express";
import RefreshTokenService from "../services/RefreshTokenService";

export default class RefreshTokenController {
    constructor(private service: RefreshTokenService) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const token =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refreshToken = await this.service.execute(token);

        return response.status(201).json(refreshToken);
    }
}
