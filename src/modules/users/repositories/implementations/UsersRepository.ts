import { getRepository, Repository } from "typeorm";
import ICreateUserDTO from "../../dTOs/ICreateUserDTO";
import User from "../../models/User";
import IUsersRepository from "../IUsersRepository";

export default class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    private static INSTANCE: UsersRepository;

    private constructor() {
        this.repository = getRepository(User);
    }

    static getInstance(): UsersRepository {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }
        return UsersRepository.INSTANCE;
    }

    async findByDocument(document: string): Promise<User | undefined> {
        return await this.repository.findOne({ document });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({
            where: { email },
            relations: ["tokens"],
        });
        return user;
    }

    async create(data: ICreateUserDTO): Promise<User> {
        const user = this.repository.create(data);

        return await this.repository.save(user);
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.repository.findOne(id, { relations: ["tokens"] });
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findByToken(token: string): Promise<User | undefined> {
        return await this.repository
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.tokens", "token")
            .where("token.token = :token", { token })
            .getOne();
    }
}
