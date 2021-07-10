import AppError from "../../../errors/AppError";
import ITokensRepository from "../repositories/ITokensRepository";

export default class ConfirmRegistrationService {
    constructor(private repository: ITokensRepository) {}

    async execute(tokenEncoded: string): Promise<void> {
        const token = await this.repository.findByEncoded(tokenEncoded);

        const user = token?.user;

        if (!token || !user) {
            throw new AppError("Token invalid!");
        } else if (user.isConfirmed) {
            throw new AppError("User already confirmed!");
        }

        // verifica se token expirado

        const currentDate = new Date();
        const expiresDate = token.expiresAt;

        if (!expiresDate || currentDate.getTime() > expiresDate.getTime()) {
            throw new AppError("Token expired!");
        }

        // salva e remove o token
        user.isConfirmed = true;
        const tokenId = token.id;

        // salva a confimação do usuário
        await this.repository.save(token);

        // remove o token antigo
        await this.repository.deleteById(tokenId);
    }
}
