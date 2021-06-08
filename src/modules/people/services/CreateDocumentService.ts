import IDocumentsRepository from "../repositories/IDocumentsRepository";

interface IRequest {
    name: string;
    person_id: string;
    files: { filename: string; mimetype: string }[];
}

export default class CreateDocumentService {
    constructor(private repository: IDocumentsRepository) {}

    async execute({ name, person_id, files }: IRequest): Promise<void> {
        files.map(async (file) => {
            return await this.repository.create({
                person_id,
                name,
                filename: file.filename,
                mimetype: file.mimetype,
            });
        });
    }
}
