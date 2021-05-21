import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../models/User";
import UserError from "../errors/UserError";

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
            throw new UserError("This email is already used.", 403);
        }

        const checkCpf = await userRepository.findOne({
            where: { cpf },
        });

        if (checkCpf) {
            throw new UserError("This CPF is already used.", 403);
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            cpf,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
