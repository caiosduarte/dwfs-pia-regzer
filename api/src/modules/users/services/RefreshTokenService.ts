import AppError from "../../../errors/AppError";
import { ITokenResponseDTO } from "../dtos/ITokenResponseDTO";
import ITokensRepository from "../repositories/ITokensRepository";
import { createRefreshToken, createToken } from "../utils/createJwt";
import { isTokenExpired, verifyRefreshToken } from "../utils/token";
import { decodeJwt } from "../utils/verifyJwt";

// TODO: Fazer a implementação VanilaDateProvider com este método e outras funções em javascript puro

const addDays = (days: number, date: Date | undefined = new Date()) => {
    const result = !date ? new Date() : date;
    result.setDate(result.getDate() + days);
    return result;
};

export default class RefreshTokenService {
    constructor(private repository: ITokensRepository) {}

    async execute(token: string): Promise<ITokenResponseDTO> {
        const jwt = decodeJwt(token);

        const userId = jwt?.sub;

        const oldRefreshToken = await this.repository.findByEncoded(token);

        // obtém o usuário atualizado
        const user = oldRefreshToken?.user;

        if (!oldRefreshToken || !user || user?.id !== userId) {
            throw new AppError("Refresh Token does not exists!", 401);
        }

        const { expiresAt } = oldRefreshToken;
        // apaga o refreshToken antigo
        this.repository.deleteById(oldRefreshToken.id);

        const isRefreshTokenValid = () => !!verifyRefreshToken(token);

        if (isTokenExpired(expiresAt) || !isRefreshTokenValid()) {
            throw new AppError("Refresh Token invalid.", 401);
        }

        const newToken = createToken(user);

        const refreshToken = createRefreshToken(user, 10);

        const newRefreshToken = this.repository.create({
            userId,
            token: refreshToken,
            // TODO: Está fixo, mas deveria implementar a lógica com refreshTokenExpiresIn
            expiresAt: addDays(10),
        });

        return {
            user: {
                id: user.id,

                email: user.email,
                document: user.document,
                cellphone: user.cellphone,

                isAdmin: user.isAdmin,
                roles: user.roles,
                permissions: user.permissions,
            },
            token: newToken,
            refreshToken,
        };
    }
}
