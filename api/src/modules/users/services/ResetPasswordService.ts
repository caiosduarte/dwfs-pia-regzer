import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ITokensRepository from "../repositories/ITokensRepository";

interface IRequest {
    tokenEncoded: string;
    password: string;
}

export default class ResetPasswordService {
    constructor(private repository: ITokensRepository) {}

    async execute({ tokenEncoded, password }: IRequest): Promise<void> {
        const token = await this.repository.findByEncoded(tokenEncoded);

        const user = token?.user;

        if (!token || !user) {
            throw new AppError("Token invalid!");
        }

        // verifica se token expirado

        const currentDate = new Date();
        const expiresDate = token.expiresAt;

        if (!expiresDate || currentDate.getTime() > expiresDate.getTime()) {
            throw new AppError("Token expired!");
        }

        // atualiza o password
        user.password = await hash(password, 8);

        if (!user.isConfirmed) {
            user.isConfirmed = true;
        }
        // salva a senha do usuário e remove o token

        const tokenId = token.id;

        // salva a senha do usuário
        await this.repository.save(token);

        // remove o token antigo
        await this.repository.deleteById(tokenId);
    }
}
