import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";
import IUser from "../models/IUser";

class CreateUserService {
    constructor(private repository: IUsersRepository) {}

    public async execute({
        name,
        document,
        cellphone,
        email,
        password,
    }: ICreateUserDTO): Promise<IUser> {
        this.repository;

        const userExists = await this.repository.findByIds({
            email,
            document,
            cellphone,
        });

        if (userExists) {
            throw new AppError(
                "Email or document or cellphone already been used.",
                403
            );
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
