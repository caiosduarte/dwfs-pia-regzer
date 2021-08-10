import { DescribeApplicableIndividualAssessmentsMessage } from "aws-sdk/clients/dms";
import { PutAssetPropertyValueEntry } from "aws-sdk/clients/iot";
import { validate } from "class-validator";
import {
    getCustomRepository,
    getRepository,
    ObjectLiteral,
    Repository,
} from "typeorm";
import Company from "../entities/Company";
import { ALL_PERSON_TYPES } from "../entities/Enum";
import Individual from "../entities/Individual";

import Person from "../entities/Person";
import { ICreatePersonDTO } from "../modules/people/dtos/ICreatePersonDTO";
import IPeopleRepository, {
    ISearchPeople,
} from "../modules/people/repositories/IPeopleRepository";

type People = Individual | Company;

export default class PeopleRepository implements IPeopleRepository {
    private static INSTANCE: PeopleRepository;

    private constructor(private repository: Repository<People>) {}

    static getInstance(): PeopleRepository {
        if (!this.INSTANCE) {
            this.INSTANCE = new PeopleRepository(getRepository<People>(Person));
        }
        return this.INSTANCE;
    }

    readonly skip = 0;
    readonly take = 10;

    private getPeopleRepository(type: string) {
        let repository: Repository<People>;
        if (type === ALL_PERSON_TYPES.FISICA) {
            repository = getRepository<Individual>(Individual);
        } else {
            repository = getRepository<Company>(Company);
        }

        return repository;
    }

    async create({ id, type, user }: ICreatePersonDTO): Promise<People> {
        const repository = this.getPeopleRepository(type);

        const person = repository.create({
            id,
            type,
            user,
        });

        console.log("Person create ", person);

        return await this.save(person, repository);
    }

    async save(
        person: People,
        repository?: Repository<People | Person>
    ): Promise<People> {
        const errors = await validate(person);
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
        const repo = repository || this.getPeopleRepository(person.type);

        return await repo.save(person);
    }

    async findById(id: string): Promise<People | undefined> {
        return await this.repository.findOne(id);
    }

    async find({
        start = this.skip,
        offset = this.take,
    }: ISearchPeople): Promise<Person[] | undefined> {
        const queryBuilder = this.repository
            .createQueryBuilder("person")
            .innerJoinAndSelect("person.user", "user")
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
