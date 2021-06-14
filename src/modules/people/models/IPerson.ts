import IUser from "../../users/models/IUser";
import IDocument from "./IDocument";

export default interface IPerson extends IUser {
    id: string;
    birthday: Date;
    gender: string;

    ethnicity: string;
    mother_name: string;
    father_name: string;
    civil_status: string;

    cpf: IDocument;
}
