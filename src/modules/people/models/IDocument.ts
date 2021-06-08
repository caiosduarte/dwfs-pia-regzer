import IPerson from "./IPerson";

export default interface IDocument {
    id?: string;
    person: IPerson;
    name: string;
    value?: string;
    filename: string;
    mimetype: string;
    createdAt?: Date;
}
