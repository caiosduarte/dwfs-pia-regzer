import { getRepository, Repository } from "typeorm";
import Person from "../entities/Person";
import { ICreatePersonDTO } from "../modules/people/dtos/ICreatePersonDTO";
import IPeopleRepository from "../modules/people/repositories/IPeopleRepository";

export default class PeopleRepository implements IPeopleRepository {
    private static INSTANCE: PeopleRepository;

    private constructor(private repository: Repository<Person>) {}

    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new PeopleRepository(getRepository(Person));
        }
        return this.INSTANCE;
    }

    async create({ userId, type }: ICreatePersonDTO): Promise<Person> {
        const person = this.repository.create({ id: userId, type });

        return await this.repository.save(person);
    }

    async save(person: Person): Promise<Person> {
        return await this.repository.save(person);
    }

    async findById(id: string): Promise<Person | undefined> {
        const person = await this.repository.findOne(id, {
            relations: ["user", "individual", "company"],
        });

        return person;
    }
}
