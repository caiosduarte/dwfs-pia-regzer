import IPerson from "../../people/models/IPerson";
import IToken from "./IToken";

interface IUser {
    id: string;

    name: string;

    email?: string;
    document?: string;
    cellphone?: string;
    password: string;

    isAdmin?: boolean;
    roles?: string[];
    permissions?: string[];

    isConfirmed?: boolean;
    confirmedAt?: Date | null;

    isValid?: boolean;
    validatedAt?: Date | null;

    tokens?: IToken[];
    person?: IPerson;
}

export default IUser;
