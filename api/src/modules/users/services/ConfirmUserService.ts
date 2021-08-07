import AppError from "../../../errors/AppError";
import ITokensRepository from "../repositories/ITokensRepository";
import { isTokenExpired } from "../utils/token";

export default class ConfirmUserService {
    constructor(private repository: ITokensRepository) {}

    async execute(tokenEncoded: string, email?: string): Promise<void> {
        const token = await this.repository.findByEncoded(tokenEncoded, email);

        if (!token) {
            throw new AppError("Token invalid.", 401);
        }

        const user = token.user;

        const expiresAt = token.expiresAt;

        if (!user) {
            throw new AppError("Token invalid.", 401);
        }

        await this.repository.deleteById(token.id);

        if (!!user.confirmedAt) {
            throw new AppError("User already confirmed.", 403);
        }

        if (isTokenExpired(expiresAt)) {
            throw new AppError("Token expired.", 401);
        }

        user.confirmedAt = new Date();

        await this.repository.save(token);
    }
}
