import IUser from "../../users/models/IUser";
import ICompany from "./ICompany";
import IDocument from "./IDocument";
import IIndividual from "./IIndividual";

export default interface IPerson {
    id: string;

    user?: IUser;

    type: string;

    personType?: IIndividual | ICompany;

    cellphone?: string;

    telephone?: string;

    documents?: IDocument[];

    validAt?: Date;
}
