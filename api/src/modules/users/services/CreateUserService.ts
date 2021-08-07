import { hash } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import UserMap from "../../../mappers";
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

        return UserMap.toDTO(user);
    }
}

export default CreateUserService;
