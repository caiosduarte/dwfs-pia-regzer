import IDocumentFile from "./IDocumentFIle";
import IPerson from "./IPerson";

export default interface IDocument {
    person: IPerson;
    name: string;
    value: string;
    documentFiles?: IDocumentFile[];
}
