import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import UserMap from "../mappers";
import { IUsersRepository } from "../repositories/IUsersRepository";

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
            throw new AppError("This email is already been used.", 403);
        }

        if (document) {
            const checkDocument = await this.repository.findByDocument(
                document
            );

            if (checkDocument) {
                throw new AppError("This document is already been used.", 403);
            }
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
