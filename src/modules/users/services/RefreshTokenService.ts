import { sign, verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import auth from "../config/auth";
import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";
import ITokensRepository from "../repositories/ITokensRepository";

interface ITokenResponse {
    userId: string;
    refreshToken: string;
}

interface ITokenPayload {
    sub: string;
    email: string;
}

export default class RefreshTokenService {
    constructor(private repository: ITokensRepository) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { refreshTokenSecret, refreshTokenExpiresIn } = auth.jwt;

        //try {
        const { sub: userId } = verify(
            token,
            refreshTokenSecret
        ) as ITokenPayload;

        const oldToken = await this.repository.findByEncodedAndUserId(
            token,
            userId
        );

        if (!oldToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        // obtém o usuário atualizado
        const emailAtualizado = oldToken.user?.email;

        const refreshToken = sign({ emailAtualizado }, refreshTokenSecret, {
            subject: userId,
        });

        // TODO: Fazer a implementação VanilaDateProvider com este método
        const addDays = function addDays(days: number, date?: Date) {
            let result = date ? new Date(date) : new Date();
            result.setDate(result.getDate() + days);
            return result;
        };

        const newRefreshToken = this.repository.create({
            userId,
            token: refreshToken,
            // TODO: Está fixo, mas deveria implementar a lógica com refreshTokenExpiresIn
            expiresAt: addDays(10),
        });

        // apaga o token antigo
        this.repository.deleteById(oldToken.id);

        return {
            userId,
            refreshToken,
        };
        //} catch {
        //    throw new AppError("Invalid JWT Token.", 401);
        //}
    }
}
