import IDocumentFile from "./IDocumentFile";
import IPerson from "./IPerson";

export default interface IDocument {
    id: string;
    person: IPerson;
    name: string;
    number: string;
    date: string;
    personName: string;
    isMain: boolean;
    files?: IDocumentFile[];
}
