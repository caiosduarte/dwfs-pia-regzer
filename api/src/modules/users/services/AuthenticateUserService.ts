import { compare } from "bcrypt";
import { response } from "express";
import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import { ITokenResponseDTO } from "../dtos/ITokenResponseDTO";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import IToken from "../models/IToken";
import IUser from "../models/IUser";
import IDateProvider from "../providers/IDateProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { createRefreshToken, createToken } from "../utils/createJwt";
import { isTokenExpired } from "../utils/token";
import { verifyRefreshToken } from "../utils/verifyJwt";

interface ICredentials {
    email?: string;
    document?: string;
    cellphone?: string;
    password?: string;
}

type UserResponse = Omit<IUser, "password" | "tokens">;

const hasRefreshTokenValid = (
    { email, document, cellphone }: ICredentials,
    tokens: IToken[] | undefined
) =>
    !!tokens?.find((refreshToken) => {
        if (!isTokenExpired(refreshToken.expiresAt)) {
            try {
                const {
                    email: emailToken,
                    document: documentToken,
                    cellphone: cellphoneToken,
                } = verifyRefreshToken<ICredentials>(refreshToken.token);
                console.log({ email, document, cellphoneToken });
                console.log({ emailToken, documentToken, cellphoneToken });
                if (
                    emailToken === email ||
                    documentToken === document ||
                    cellphoneToken === cellphone
                ) {
                    return refreshToken;
                }
            } catch {
                console.error(refreshToken);
            }
        }
    });

class AuthenticateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokensRepository: ITokensRepository,
        private dateProvider: IDateProvider
    ) {}

    public async execute({
        email,
        cellphone,
        document,
        password,
        remember,
    }: ICredentials & { remember: boolean }): Promise<ITokenResponseDTO> {
        const user = await this.usersRepository
            .findBy({ email, cellphone, document })
            .then((result) => result && result[0]);

        if (!user) {
            throw new AppError("Email/password don't match.", 404);
        }

        if (password) {
            const passwordValid = await compare(password, user.password);

            if (!passwordValid) {
                throw new AppError("Email/password don't match.", 401);
            }
        } else if (
            !hasRefreshTokenValid({ email, cellphone, document }, user.tokens)
        ) {
            throw new AppError("Last entrance is too long or not found.", 401);
        }

        const token = createToken(user);

        const refreshTokenDays = remember ? 30 : 10;

        const refreshToken = createRefreshToken(user, refreshTokenDays);

        this.tokensRepository.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: this.dateProvider.addDays(refreshTokenDays),
        } as ICreateTokenDTO);

        return {
            user: {
                id: user.id,

                email: user.email,
                document: user.document,
                cellphone: user.cellphone,

                isAdmin: user.isAdmin,
                roles: user.roles,
                permissions: user.permissions,

                isConfirmed: user.isConfirmed,
            },
            token,
            refreshToken,
        };
    }
}

export default AuthenticateUserService;
