import IPeopleRepository from "../repositories/IPeopleRepository";

export default class CreateDocumentService {
    constructor(private repository: IPeopleRepository) {}

    execute(person_id: string, files: string): Promise<void> {}
}
