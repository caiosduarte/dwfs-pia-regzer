import IUser from "./IUser";

export default interface IToken {
    id?: string;

    userId: string;

    user: IUser;

    token: string;

    expiresAt: Date;

    createdAt: Date;
}
