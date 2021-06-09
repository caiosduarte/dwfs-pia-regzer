import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import UserMap from "../mappers/UserMap";
import IUsersRepository from "../repositories/IUsersRepository";

class CreateUserService {
    constructor(private repository: IUsersRepository) {}

    public async execute({
        name,
        document,
        cellphone,
        email,
        password,
    }: ICreateUserDTO): Promise<IUserResponseDTO> {
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

        return UserMap.toDTO(user);
    }
}

export default CreateUserService;
