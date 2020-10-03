import AppError from "../errors/AppError";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../models/User";

interface Request {
    name: string;
    cpf: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({
        name,
        cpf,
        email,
        password,
    }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkEmailExists = await userRepository.findOne({
            where: { email },
        });

        if (checkEmailExists) {
            throw new AppError("This email is already used.", 403);
        }

        const checkCpf = await userRepository.findOne({
            where: { cpf },
        });

        if (checkCpf) {
            throw new AppError("This CPF is already used.", 403);
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
