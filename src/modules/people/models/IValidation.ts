import IUser from "../../users/models/IUser";
import IPerson from "./IPerson";

interface IValidateDTO {
    analystId: string;
    message: string;
    isValid: boolean;
    validAt: Date;
}

export default class IValidation {
    id?: string;
    readonly person: IPerson;
    readonly field: string;
    readonly value: string;
    analyst?: IUser;
    message?: string;
    isValid: boolean;
    validAt?: Date;

    validate({ analystId, message, isValid, validAt }: IValidateDTO) {
        Object.assign(this, { message });
    }
}
