import { getRepository, Repository } from "typeorm";
import Document from "../entities/Document";
import ICreateDocumentDTO from "../modules/people/dtos/ICreateDocumentDTO";
import IDocumentsRepository from "../modules/people/repositories/IDocumentsRepository";

export default class DocumentsRepository implements IDocumentsRepository {
    private static INSTANCE: DocumentsRepository;

    private constructor(private repository: Repository<Document>) {}

    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new DocumentsRepository(getRepository(Document));
        }
        return this.INSTANCE;
    }

    async create({
        person_id,
        name,
        value,
        filename,
        mimetype,
    }: ICreateDocumentDTO): Promise<Document> {
        const document = this.repository.create({
            person_id,
            name,
            filename,
            mimetype,
        });

        return await this.repository.save(document);
    }
}
