import { getRepository, Repository } from "typeorm";
import ICreateUserDTO from "../modules/users/dtos/ICreateUserDTO";
import User from "../entities/User";
import {
    IUsersRepository,
    IUserQueryParams,
} from "../modules/users/repositories/IUsersRepository";
import IUser from "../modules/users/models/IUser";

export default class UsersRepository implements IUsersRepository {
    readonly INSTANCE: IUsersRepository;
    private static INSTANCE: UsersRepository;

    private repository: Repository<User>;

    private constructor() {
        this.repository = getRepository(User);
        this.INSTANCE = this;
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

    // TODO: Acrescentar os demais parâmetros se não forem nulos
    async findBy({
        email,
        document,
        cellphone,
    }: IUserQueryParams): Promise<IUser[] | undefined> {
        return await this.repository.find({
            where: { email },
            relations: ["tokens"],
        });
    }
}
