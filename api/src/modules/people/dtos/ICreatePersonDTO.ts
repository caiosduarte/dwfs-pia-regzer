import IUser from "../../users/models/IUser";

type UserPerson = Partial<IUser>;

export interface ICreatePersonDTO {
    id: string;
    type: string;
    userId?: string;
    user?: UserPerson;
}
