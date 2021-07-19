import IUserResponseDTO from "../dtos/IUserResponseDTO";
import IUser from "../models/IUser";

export default class UserMap {
    static toDTO({
        id,
        name,

        email,
        document,
        cellphone,

        isAdmin,
        roles,
        permissions,

        isConfirmed,
        isValid,
    }: IUser): IUserResponseDTO {
        return {
            id,
            name,

            email,
            document,
            cellphone,

            isAdmin,
            roles,
            permissions,

            isConfirmed,
            isValid,
        };
    }
}
