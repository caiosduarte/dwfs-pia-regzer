import IToken from "./IToken";

interface IUser {
    id: string;
    name: string;
    document: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isConfirmed: boolean;
    tokens?: IToken[];
}

export default IUser;
