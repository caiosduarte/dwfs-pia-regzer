import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateUserDTO from "../dTOs/ICreateUserDTO";
import User from "../models/User";
import UsersRepository from "../repositories/implementations/UsersRepository";

interface IUserResponse {
    name: string;
    document: string;
    email: string;
    cellphone: string;
    isAdmin: boolean;
    isConfirmed: boolean;
    createdAt: Date;
}

class CreateUserService {
    constructor(private repository: UsersRepository) {}

    public async execute({
        name,
        document,
        cellphone,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        this.repository;

        const checkEmailExists = await this.repository.findByEmail(email);

        if (checkEmailExists) {
            throw new AppError("This email is already used.", 403);
        }

        const checkCpf = await this.repository.findByDocument(document);

        if (checkCpf) {
            throw new AppError("This document is already used.", 403);
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.repository.create({
            name,
            document,
            cellphone,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
