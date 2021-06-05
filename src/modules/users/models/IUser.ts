import IToken from "./IToken";

interface IUser {
    id?: string;

    name: string;

    document: string;

    cellphone: string;

    email: string;

    password: string;

    isAdmin: boolean;

    isConfirmed: boolean;

    createdAt: Date;

    updatedAt: Date;

    tokens?: IToken[];
}

export default IUser;
