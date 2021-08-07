import { getRepository, IsNull, Not, Repository } from "typeorm";
import ICreateUserDTO from "../modules/users/dtos/ICreateUserDTO";
import User from "../entities/User";
import {
    IUsersRepository,
    IUserQueryParams,
    ISearchParams,
} from "../modules/users/repositories/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
    readonly INSTANCE: IUsersRepository;
    private static INSTANCE: UsersRepository;

    private repository: Repository<User>;

    readonly skip = 0;
    readonly take = 10;

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

    async create(data: ICreateUserDTO): Promise<User> {
        const user = this.repository.create(data);

        return await this.repository.save(user);
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.repository.findOne(id, {
            relations: ["tokens"],
        });
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findByToken(token: string): Promise<User | undefined> {
        return await this.repository
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.tokens", "token")
            .where("token.token = :token", { token })
            .cache(true)
            .getOne();
    }

    async findByIds({
        id,
        email,
        document,
        cellphone,
    }: IUserQueryParams): Promise<User | undefined> {
        return await this.repository.findOne({
            where: [{ id }, { email }, { document }, { cellphone }],
            relations: ["tokens"],
            cache: true,
        });
    }

    async find({
        start = this.skip,
        offset = this.take,
    }: ISearchParams): Promise<User[] | undefined> {
        const queryBuilder = this.repository
            .createQueryBuilder("user")
            .leftJoin("user.person", "person")
            .addSelect("person.type")
            .orderBy({
                "user.updatedAt": "DESC",
                "user.name": "ASC",
            })
            .cache(true);

        if (isNaN(start) || isNaN(offset)) {
            queryBuilder.skip(this.skip).take(this.take);
        } else {
            queryBuilder.skip(start).take(offset);
        }

        return await queryBuilder.getMany();
    }
}
