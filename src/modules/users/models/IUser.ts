import IToken from "./IToken";

interface IUser {
    id: string;

    name: string;

    document: string;

    cellphone: string;

    email: string;

    password: string;

    isAdmin: boolean;

    isConfirmed: boolean;

    createdAt: Date;

    tokens?: IToken[];

    updatedAt: Date;
}

export default IUser;
