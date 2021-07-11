import AppError from "../../../errors/AppError";
import { ITokenResponseDTO } from "../dtos/ITokenResponseDTO";
import ITokensRepository from "../repositories/ITokensRepository";
import { createRefreshToken, createToken } from "../utils/createJwt";
import { verifyRefreshToken } from "../utils/verifyJwt";

 
// TODO: Fazer a implementação VanilaDateProvider com este método e outras funções em javascript puro

const addDays = (days: number, date: Date| undefined = new Date()) => {
    const result = !date ? new Date(): date;
    result.setDate(result.getDate() + days);
    return result;
};

export default class RefreshTokenService {
    constructor(private repository: ITokensRepository) {}

    async execute(token: string): Promise<ITokenResponseDTO> {

        const jwt = verifyRefreshToken(token);

        const { sub: userId } = jwt;

        const oldRefreshToken = await this.repository.findByEncodedAndUserId(
            token,
            userId
        );

        // obtém o usuário atualizado
        const user = oldRefreshToken?.user;

        if (!oldRefreshToken || !user) {
            throw new AppError("Refresh Token does not exists!");
        }

        const newToken = createToken(user);

        // apaga o refreshToken antigo
        this.repository.deleteById(oldRefreshToken.id);

        const refreshToken = createRefreshToken(user);

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
