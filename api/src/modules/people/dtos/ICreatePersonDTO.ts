import IUser from "../../users/models/IUser";

export interface ICreatePersonDTO {
    id: string;
    type: string;
    userId?: string;
    user?: Partial<IUser>;
}
