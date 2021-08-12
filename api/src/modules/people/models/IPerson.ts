import IUser from "../../users/models/IUser";
import IDocument from "./IDocument";

export default interface IPerson {
    id: string;

    user: IUser;

    type: string;

    cellphone?: string;

    telephone?: string;

    documents?: IDocument[];

    validatedAt?: Date | null;

    isValid?: boolean;
}
