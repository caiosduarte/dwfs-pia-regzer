import ICreateUserDTO from "../dTOs/ICreateUserDTO";
import User from "../models/User";

export default interface IUsersRepository {
    findByDocument(document: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User | undefined>;
}
