import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUser from "../models/IUser";

export default interface IUsersRepository {
    readonly INSTANCE: IUsersRepository;
    findByDocument(document: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    create(data: ICreateUserDTO): Promise<IUser | undefined>;
    findById(id: string): Promise<IUser | undefined>;
    save(user: IUser): Promise<IUser>;
    findByToken(token: string): Promise<IUser | undefined>;
}
