import { DescribeApplicableIndividualAssessmentsMessage } from "aws-sdk/clients/dms";
import { PutAssetPropertyValueEntry } from "aws-sdk/clients/iot";
import { getRepository, Repository } from "typeorm";
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

    static getInstance<T extends People>(): PeopleRepository {
        if (!this.INSTANCE) {
            this.INSTANCE = new PeopleRepository(getRepository<People>(Person));
        }
        return this.INSTANCE;
    }

    readonly skip = 0;
    readonly take = 10;

    async create({ id, type, user }: ICreatePersonDTO): Promise<People> {
        let person: People;
        if (type === ALL_PERSON_TYPES.FISICA) {
            const repository = getRepository<Individual>(Individual);
            person = repository.create({
                id,
                type,
                user,
            });
            return repository.save(person);
        } else {
            const repository = getRepository<Company>(Company);
            person = repository.create({
                id,
                type,
                user,
            });
            return repository.save(person);
        }
    }

    async save(person: People): Promise<People> {
        return await this.repository.save(person);
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

        if (!isNaN(start) && !isNaN(offset)) {
            queryBuilder.skip(this.skip).take(this.take);
        }

        return await queryBuilder.getMany();
    }
}
