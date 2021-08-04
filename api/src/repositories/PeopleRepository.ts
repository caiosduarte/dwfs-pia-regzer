import { getRepository, Repository } from "typeorm";

import Person from "../entities/Person";
import { ICreatePersonDTO } from "../modules/people/dtos/ICreatePersonDTO";
import IPeopleRepository, {
    ISearchPeople,
} from "../modules/people/repositories/IPeopleRepository";

export default class PeopleRepository implements IPeopleRepository {
    private static INSTANCE: PeopleRepository;

    private constructor(private repository: Repository<Person>) {}

    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new PeopleRepository(getRepository(Person));
        }
        return this.INSTANCE;
    }

    skip = 0;
    take = 10;

    async create({ userId, type }: ICreatePersonDTO): Promise<Person> {
        const person = this.repository.create({
            id: userId,
            type,
        });

        return await this.repository.save(person);
    }

    async save(person: Person): Promise<Person> {
        return await this.repository.save(person);
    }

    async findById(id: string): Promise<Person | undefined> {
        return await this.repository.findOne(id);
    }

    async find({
        start = this.skip,
        offset = this.take,
    }: ISearchPeople): Promise<Person[] | undefined> {
        const queryBuilder = this.repository
            .createQueryBuilder("person")
            .innerJoinAndSelect("person.user", "user")
            // .leftJoinAndSelect("person.individual", "individual")
            // .leftJoinAndSelect("person.company", "company")
            .orderBy({
                "user.updatedAt": "DESC",
                "user.name": "ASC",
            })
            .cache(true);

        if (!isNaN(start) && !isNaN(offset)) {
            queryBuilder.skip(this.skip).take(this.take);
        }

        return await queryBuilder.getMany();
    }
}
