import ICreateDocumentDTO from "../dtos/ICreateDocumentDTO";
import IDocument from "../models/IDocument";

export default interface IDocumentsRepository {
    deleteById(id: string): Promise<void>;

    findByPersonIdAndName(
        person_id: string,
        name: string
    ): Promise<IDocument[]>;

    create(data: ICreateDocumentDTO): Promise<IDocument>;
}
