import { getRepository, Repository } from "typeorm";
// import Document from "../entities/PersonDocument";
import ICreateDocumentDTO from "../modules/people/dtos/ICreateDocumentDTO";
import IDocument from "../modules/people/models/IDocument";
import IDocumentsRepository from "../modules/people/repositories/IDocumentsRepository";

export default class DocumentsRepository implements IDocumentsRepository {
    private static INSTANCE: DocumentsRepository;

    private constructor(private repository: Repository<Document>) {}
    create(data: ICreateDocumentDTO): Promise<IDocument> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByPersonIdAndName(
        person_id: string,
        name: string
    ): Promise<IDocument[]> {
        throw new Error("Method not implemented.");
    }

    static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new DocumentsRepository(getRepository(Document));
        }
        return this.INSTANCE;
    }
}
