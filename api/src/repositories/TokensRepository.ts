import { getRepository, Repository } from "typeorm";
import Token from "../entities/Token";
import ICreateTokenDTO from "../modules/users/dtos/ICreateTokenDTO";
import ITokensRepository from "../modules/users/repositories/ITokensRepository";

export default class TokensRepository implements ITokensRepository {
    readonly INSTANCE: ITokensRepository;
    private static INSTANCE: TokensRepository;

    private repository: Repository<Token>;

    private constructor() {
        this.repository = getRepository(Token);
        this.INSTANCE = this;
    }

    static getInstance(): TokensRepository {
        if (!TokensRepository.INSTANCE) {
            TokensRepository.INSTANCE = new TokensRepository();
        }
        return TokensRepository.INSTANCE;
    }

    async create({
        userId,
        token,
        expiresAt,
    }: ICreateTokenDTO): Promise<Token> {
        const newToken = this.repository.create({ userId, token, expiresAt });
        await this.repository.save(newToken);

        return newToken;
    }

    async findById(id: string): Promise<Token | undefined> {
        return await this.repository.findOne(id, { relations: ["user"] });
    }

    async deleteById(id: string): Promise<any> {
        return await this.repository.delete(id);
    }

    async findByEncoded(
        encoded: string,
        email?: string
    ): Promise<Token | undefined> {
        const whereWithEmail = email ? { user: { email: email } } : {};
        return await this.repository.findOne({
            join: {
                alias: "token",
                innerJoinAndSelect: {
                    users: "token.user",
                },
            },
            where: {
                token: encoded,
            },
        });
    }

    async save(token: Token): Promise<Token> {
        return await this.repository.save(token);
    }

    async findByEncodedAndUserId(
        encoded: string,
        userId: string
    ): Promise<Token | undefined> {
        return await this.repository.findOne({
            where: { token: encoded, userId },
            relations: ["user"],
        });
    }
}
