import IStorageProvider from "../../../providers/StorageProvider/IStorageProvider";
import IDocumentsRepository from "../repositories/IDocumentsRepository";

interface IRequest {
    name: string;
    person_id: string;
    files: { filename: string; mimetype: string }[];
}

export default class CreateDocumentService {
    constructor(
        private repository: IDocumentsRepository,
        private storage: IStorageProvider
    ) {}

    async execute({ name, person_id, files }: IRequest): Promise<void> {
        const documents = await this.repository.findByPersonIdAndName(
            person_id,
            name
        );

        documents.map(async (document) => {
            await this.storage.delete("documents", document.filename);

            await this.repository.deleteById(document.id);
        });

        files.map(async (file) => {
            await this.storage.save("documents", file.filename, file.mimetype);

            await this.repository.create({
                person_id,
                name,
                filename: file.filename,
                mimetype: file.mimetype,
            });
        });
    }
}
