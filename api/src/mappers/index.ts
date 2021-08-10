import IPerson from "../modules/people/models/IPerson";
import IUserResponseDTO from "../modules/users/dtos/IUserResponseDTO";
import IUser from "../modules/users/models/IUser";

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

        confirmedAt,
        validatedAt,
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

            confirmedAt,
            validatedAt,
        };
    }
}
