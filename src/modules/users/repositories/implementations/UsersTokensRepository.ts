import { getRepository, Repository } from "typeorm";
import ICreateTokenDTO from "../../dTOs/ICreateTokenDTO";
import Token from "../../models/Token";
import IUsersTokensRepository from "../IUsersTokensRepository";

export default class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<Token>;
    private static INSTANCE: UsersTokensRepository;

    private constructor() {
        this.repository = getRepository(Token);
    }

    static getInstance(): UsersTokensRepository {
        if (!UsersTokensRepository.INSTANCE) {
            UsersTokensRepository.INSTANCE = new UsersTokensRepository();
        }
        return UsersTokensRepository.INSTANCE;
    }
    async create({
        userId,
        token,
        expiresAt,
    }: ICreateTokenDTO): Promise<Token> {
        const Token = this.repository.create({ userId, token, expiresAt });
        await this.repository.save(Token);

        return Token;
    }

    async findById(id: string): Promise<Token | undefined> {
        return await this.repository.findOne(id);
    }
}
