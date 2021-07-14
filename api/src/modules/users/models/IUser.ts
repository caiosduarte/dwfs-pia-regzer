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
    isValid?: boolean;

    tokens?: IToken[];
}

export default IUser;
