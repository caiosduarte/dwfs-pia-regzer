import IUser from "../../users/models/IUser";

export default interface IAnalysis {
    analyst: IUser;
    userMessage: string;
    isValid: boolean;
    validAt: Date;
}
