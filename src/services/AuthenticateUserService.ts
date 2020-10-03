import AppError from "../errors/AppError";
import authConfig from "../config/auth";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError("User email/password not match.", 401);
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            throw new AppError("User email/password not match.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
