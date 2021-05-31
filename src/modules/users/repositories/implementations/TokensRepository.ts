import { getRepository, Repository } from "typeorm";
import ICreateTokenDTO from "../../dTOs/ICreateTokenDTO";
import Token from "../../models/Token";
import ITokensRepository from "../ITokensRepository";

export default class TokensRepository implements ITokensRepository {
    private repository: Repository<Token>;
    private static INSTANCE: TokensRepository;

    private constructor() {
        this.repository = getRepository(Token);
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

    async findByEncoded(encoded: string): Promise<Token | undefined> {
        return await this.repository.findOne({
            where: { token: encoded },
            relations: ["user"],
        });
    }

    async save(token: Token): Promise<Token> {
        return await this.repository.save(token);
    }
}
