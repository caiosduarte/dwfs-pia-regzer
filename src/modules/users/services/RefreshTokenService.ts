import { sign, verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import auth from "../config/auth";
import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";
import IUsersRepository from "../repositories/IUsersRepository";

interface ITokenResponse {
    userId: string;
    refreshToken: string;
}

interface ITokenPayload {
    sub: string;
    email: string;
}

export default class RefreshTokenService {
    constructor(private repository: IUsersRepository) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { refreshTokenSecret, refreshTokenExpiresIn } = auth.jwt;

        try {
            const { sub: userId, email } = verify(
                token,
                refreshTokenSecret
            ) as ITokenPayload;

            const user = await this.repository.findById(userId);

            if (!user || !user.tokens) {
                throw new AppError("Refresh Token does not exists!");
            }

            const { tokens } = user;

            const oldRefreshToken = tokens.find((t) => t.token === token);

            if (!oldRefreshToken) {
                throw new AppError("Refresh Token does not exists!");
            }

            const refreshTokenEncoded = sign({ email }, refreshTokenSecret, {
                subject: userId,
            });

            const newRefreshToken = new Token();

            Object.assign(newRefreshToken, {
                token: refreshTokenEncoded,
                expiresAt: new Date(),
                userId,
            } as ICreateTokenDTO);

            tokens.splice(
                tokens.findIndex((token) => token === oldRefreshToken),
                1
            );

            await this.repository.save(user);

            return {
                userId,
                refreshToken: refreshTokenEncoded,
            };
        } catch {
            throw new AppError("Invalid JWT Token.", 401);
        }
    }
}
