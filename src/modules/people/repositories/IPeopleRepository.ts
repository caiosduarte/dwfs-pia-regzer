import ICreatePersonDTO from "../dtos/ICreatePersonDTO";
import IPerson from "../models/IPerson";

export default interface IPeopleRepository {
    create(data: ICreatePersonDTO): Promise<IPerson>;
    save(person: IPerson): Promise<IPerson>;
    findById(id: string): Promise<IPerson | undefined>;
}
