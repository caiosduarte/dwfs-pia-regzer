import { getRepository, Repository } from "typeorm";
import Person from "../entities/Person";
import ICreatePersonDTO from "../modules/people/dtos/ICreatePersonDTO";
import IPerson from "../modules/people/models/IPerson";
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

    async create({ name }: ICreatePersonDTO): Promise<IPerson> {
        const person = this.repository.create({ name });

        return await this.repository.save(person);
    }

    async save(person: IPerson): Promise<IPerson> {
        return await this.repository.save(person);
    }

    async findById(id: string): Promise<IPerson | undefined> {
        const person = await this.repository.findOne(id, {
            relations: ["documents"],
        });

        return person;
    }
}
