import IUserResponseDTO from "../dtos/IUserResponseDTO";
import IUser from "../models/IUser";

export default class UserMap {
    static toDTO({
        id,
        name,
        email,
        document,
        isAdmin,
        isConfirmed,
    }: IUser): IUserResponseDTO {
        return {
            id,
            name,
            email,
            document,
            isAdmin,
            isConfirmed,
        };
    }
}
