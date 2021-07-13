import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ITokensRepository from "../repositories/ITokensRepository";
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
            throw new AppError("Token invalid!", 403);
        }

        const expiresAt = token.expiresAt;

        // remove o token antigo
        await this.repository.deleteById(token.id);

        // verifica se token expirado

        if (isTokenExpired(expiresAt)) {
            throw new AppError("Token expired!", 403);
        }

        const user = token?.user;

        // atualiza o password
        user.password = await hash(password, 8);

        if (!user.isConfirmed) {
            user.isConfirmed = true;
        }

        // salva a senha do usuário
        await this.repository.save(token);
    }
}
