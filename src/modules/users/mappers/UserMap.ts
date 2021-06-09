import IUserResponseDTO from "../dtos/IUserResponseDTO";
import IUser from "../models/IUser";

export default class UserMap {
    static toDTO({
        id,
        name,
        email,
        cellphone,
        document,
        isAdmin,
        updatedAt,
        isConfirmed,
        createdAt,
    }: IUser): IUserResponseDTO {
        return {
            id,
            name,
            email,
            document,
            cellphone,
            isConfirmed,
            createdAt,
        };
    }
}
