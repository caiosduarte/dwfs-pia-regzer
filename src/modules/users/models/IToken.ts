import IUser from "./IUser";

export default interface IToken {
    id: string;
    user: IUser;
    token: string;
    expiresAt: Date;
}
