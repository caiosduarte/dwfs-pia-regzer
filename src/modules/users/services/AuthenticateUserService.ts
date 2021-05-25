import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import AppError from "../../../errors/AppError";
import authConfig from "../config/auth";
import UserError from "../errors/UserError";
import User from "../models/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
    };
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError("Email/password don't match.", 401);
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            throw new AppError("Email/password don't match.", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        const tokenResponse: IResponse = {
            token,
            user: {
                id: user.id,
            },
        };

        return tokenResponse;
    }
}

export { UserError, AuthenticateUserService };
