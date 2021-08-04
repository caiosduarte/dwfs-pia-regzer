import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import UserMap from "../mappers";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { isTokenExpired } from "../utils/token";

interface IRequest {
    tokenEncoded: string;
    password: string;
}

export default class ResetPasswordService {
    constructor(private repository: ITokensRepository) {}

    async execute({ tokenEncoded, password }: IRequest): Promise<void> {
        const token = await this.repository.findByEncoded(tokenEncoded);

        if (!token) {
            throw new AppError("Token invalid.", 403);
        }

        const expiresAt = token.expiresAt;
        const user = token?.user;

        // verifica se token expirado

        if (isTokenExpired(expiresAt)) {
            // remove o token antigo
            await this.repository.deleteById(token.id);
            throw new AppError(`Token expired at ${expiresAt}.`, 403);
        }

        // atualiza o password
        user.password = await hash(password, 8);

        if (!user.isConfirmed) {
            user.isConfirmed = true;
        }

        // salva a senha do usuário
        await this.repository.save(token);

        await this.repository.deleteById(token.id);
    }
}
