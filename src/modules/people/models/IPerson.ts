import IAddress from "./IAddress";
import IContact from "./IContact";
import IDocument from "./IDocument";

export default interface IPerson {
    id?: string;
    name: string;
    documents?: IDocument[];
    contacts?: IContact[];
    addresses?: IAddress[];
    guarantors?: IPerson[];
    isValid: boolean;
}
