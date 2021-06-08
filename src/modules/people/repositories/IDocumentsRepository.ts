import ICreateDocumentDTO from "../dtos/ICreateDocumentDTO";
import IDocument from "../models/IDocument";

export default interface IDocumentsRepository {
    create(data: ICreateDocumentDTO): Promise<IDocument>;
}
