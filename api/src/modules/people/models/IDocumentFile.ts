import IDocument from "./IDocument";

export default interface IDocumentFile {
    id: string;
    document: IDocument;
    filename: string;
    mimetype: string;
}
