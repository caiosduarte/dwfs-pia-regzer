import { getRepository, IsNull, Not, Repository } from "typeorm";
import ICreateUserDTO from "../modules/users/dtos/ICreateUserDTO";
import User from "../entities/User";
import {
    IUsersRepository,
    IUserQueryParams,
    ISearchParams,
} from "../modules/users/repositories/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
    skip = 0;
    take = 10;

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
        return await this.repository.findOne(id, {
            relations: ["tokens", "person"],
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
            .getOne();
    }

    // TODO: Acrescentar os demais parâmetros se não forem nulos
    async findByIds({
        id,
        email,
        document,
        cellphone,
    }: IUserQueryParams): Promise<User[] | undefined> {
        return await this.repository.find({
            where: [{ id }, { email }, { document }, { cellphone }],
            relations: ["tokens", "person"],
            cache: true,
        });
    }

    async find({
        start = this.skip,
        offset = this.take,
    }: ISearchParams): Promise<User[] | undefined> {
        // const queryBuilder = this.repository
        //     .createQueryBuilder("user")
        //     // .leftJoinAndSelect("user.tokens", "user_token")
        //     // .leftJoinAndSelect(
        //     //     "person",
        //     //     "person",
        //     //     "user.user_id = person.person_id"
        //     // )
        //     .orderBy("user.updated_at", "DESC")
        //     .addOrderBy("user.name", "ASC")
        //     .cache(true);

        // if (!isNaN(start) && !isNaN(offset)) {
        //     queryBuilder.skip(this.skip).take(this.take);
        // }

        // return await queryBuilder.getMany();

        return await this.repository.find({
            relations: ["person"],
        });
    }
}
