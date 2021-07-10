import { compare } from "bcrypt";
import AppError from "../../../errors/AppError";
import authConfig from "../config/auth";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import IDateProvider from "../providers/IDateProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import createJsonWebTokenEncoded from "../utils/createJsonWebTokenEncoded";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        email?: string;
        isAdmin?: boolean;
        roles?: string[];
        permissions?: string[];
    };
    token: string;
    refreshToken: string;
}

class AuthenticateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokensRepository: ITokensRepository,
        private dateProvider: IDateProvider
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email/password don't match.", 401);
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            throw new AppError("Email/password don't match.", 401);
        }

        const {
            tokenSecret,
            tokenExpiresIn,
            refreshTokenSecret,
            refreshTokenExpiresIn,
        } = authConfig.jwt;

        const tokenEncoded = createJsonWebTokenEncoded({
            payload: {
                isAdmin: user.isAdmin,
            },
            secret: tokenSecret,
            subject: user.id,
            expiresIn: tokenExpiresIn,
        });

        const refreshTokenEncoded = createJsonWebTokenEncoded({
            payload: { email },
            secret: refreshTokenSecret,
            subject: user.id,
            expiresIn: refreshTokenExpiresIn,
        });

        const refreshToken = this.tokensRepository.create({
            userId: user.id,
            token: refreshTokenEncoded,
            expiresAt: this.dateProvider.addDays(10),
        } as ICreateTokenDTO);

        return {
            user: {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token: tokenEncoded,
            refreshToken: refreshTokenEncoded,
        } as IResponse;
    }
}

export default AuthenticateUserService;
