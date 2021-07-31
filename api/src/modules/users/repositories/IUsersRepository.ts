import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUser from "../models/IUser";

export interface IUserQueryParams {
    id?: string;
    email?: string;
    document?: string;
    cellphone?: string;
}

export interface ISearchParams {
    start?: number;
    offset?: number;
}

export interface IUsersRepository {
    readonly INSTANCE: IUsersRepository;
    findByDocument(document: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    create(data: ICreateUserDTO): Promise<IUser>;
    findById(id: string): Promise<IUser | undefined>;
    save(user: IUser): Promise<IUser>;
    findByToken(token: string): Promise<IUser | undefined>;
    findByIds(data: IUserQueryParams): Promise<IUser[] | undefined>;
    find(data: ISearchParams): Promise<IUser[] | undefined>;
}
