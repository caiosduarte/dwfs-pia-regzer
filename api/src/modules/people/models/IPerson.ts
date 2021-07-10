import IUser from "../../users/models/IUser";

export default interface IPerson {
    user: IUser;
    cellphone: string;
    telephone: string;
    isValid: boolean;
    validAt: Date;
}
