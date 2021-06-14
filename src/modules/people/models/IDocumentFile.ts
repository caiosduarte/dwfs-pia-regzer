import IDocument from "./IDocument";

export default interface IDocumentFile {
    document: IDocument;
    filename: string;
    mimetype: string;
}
