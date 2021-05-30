import { compare } from "bcrypt";
import AppError from "../../../errors/AppError";
import authConfig from "../config/auth";
import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";
import IUsersRepository from "../repositories/IUsersRepository";
import createJsonWebTokenEncoded from "../utils/createJsonWebTokenEncoded";
import DateProvider from "../utils/implementations/DateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
    };
    token: string;
    refreshToken: string;
}

class AuthenticateUserService {
    constructor(private service: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.service.findByEmail(email);

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
            secret: tokenSecret,
            subject: user.id,
            expiresIn: tokenExpiresIn,
            payload: email,
        });

        const refreshTokenEncoded = createJsonWebTokenEncoded({
            secret: refreshTokenSecret,
            subject: user.id,
            expiresIn: refreshTokenExpiresIn,
            payload: email,
        });

        const refreshToken = new Token();

        Object.assign(refreshToken, {
            userId: user.id,
            token: refreshTokenEncoded,
            expiresAt: new DateProvider().addDays(10),
        } as ICreateTokenDTO);

        user.tokens.push(refreshToken);

        await this.service.save(user);

        const tokenResponse: IResponse = {
            token: tokenEncoded,
            refreshToken: refreshTokenEncoded,
            user: {
                id: user.id,
            },
        };

        return tokenResponse;
    }
}

export { AuthenticateUserService };
