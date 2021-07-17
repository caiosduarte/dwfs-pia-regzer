import AppError from "../../../errors/AppError";
import ITokensRepository from "../repositories/ITokensRepository";
import { isTokenExpired } from "../utils/token";

export default class ConfirmUserService {
    constructor(private repository: ITokensRepository) {}

    async execute(tokenEncoded: string): Promise<void> {
        const token = await this.repository.findByEncoded(tokenEncoded);

        if (!token) {
            throw new AppError("Token invalid.", 401);
        }

        const user = token.user;

        await this.repository.deleteById(token.id);

        if (!user) {
            throw new AppError("Token invalid.", 401);
        }

        if (user.isConfirmed) {
            throw new AppError("User already confirmed.", 403);
        }

        if (isTokenExpired(token.expiresAt)) {
            throw new AppError("Token expired.", 401);
        }

        user.isConfirmed = true;

        await this.repository.save(token);
    }
}
