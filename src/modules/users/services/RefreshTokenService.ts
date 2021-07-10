import { sign, TokenExpiredError, verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import { verifyToken } from "../../../middlewares/ensureAuthenticated";
import auth from "../config/auth";
import ITokensRepository from "../repositories/ITokensRepository";
import createJsonWebTokenEncoded from "../utils/createJsonWebTokenEncoded";

interface ITokenResponse {
    token: string;
    userId: string;
    refreshToken: string;
}

interface ITokenPayload {
    sub: string;
    email: string;
    exp?: string;
}

export default class RefreshTokenService {
    constructor(private repository: ITokensRepository) {}

    async execute(token: string): Promise<ITokenResponse> {
        const {
            tokenSecret,
            tokenExpiresIn,
            refreshTokenSecret,
            refreshTokenExpiresIn,
        } = auth.jwt;

        const jwt = verifyToken(token, refreshTokenSecret);

        const { sub: userId } = jwt;

        const oldToken = await this.repository.findByEncodedAndUserId(
            token,
            userId
        );

        // obtém o usuário atualizado
        const user = oldToken?.user;

        if (!oldToken || !user) {
            throw new AppError("Refresh Token does not exists!");
        }

        // apaga o token antigo
        this.repository.deleteById(oldToken.id);

        const refreshToken = createJsonWebTokenEncoded({
            payload: { email: user.email },
            secret: refreshTokenSecret,
            subject: userId,
            expiresIn: refreshTokenExpiresIn,
        });

        // TODO: Fazer a implementação VanilaDateProvider com este método e outras funções em javascript puro
        const addDays = function addDays(days: number, date = new Date()) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        const newRefreshToken = this.repository.create({
            userId,
            token: refreshToken,
            // TODO: Está fixo, mas deveria implementar a lógica com refreshTokenExpiresIn
            expiresAt: addDays(10),
        });

        const newToken = createJsonWebTokenEncoded({
            payload: { isAdmin: user.isAdmin },
            secret: tokenSecret,
            subject: userId,
            expiresIn: tokenExpiresIn,
        });

        return {
            userId,
            token: newToken,
            refreshToken,
        };
    }
}
