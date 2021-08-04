import { compare } from "bcrypt";

import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import { ITokenResponseDTO } from "../dtos/ITokenResponseDTO";
import UserMap from "../../../mappers";

import IToken from "../models/IToken";

import IDateProvider from "../providers/IDateProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { createRefreshToken, createToken } from "../utils/createJwt";
import { isRefreshTokenValid } from "../utils/token";

interface ICredentials {
    email?: string;
    document?: string;
    cellphone?: string;
    password?: string;
}

type IIDs = Omit<ICredentials, "password">;

const hasRefreshTokenValid = (ids: IIDs, tokens: IToken[] | undefined) =>
    !!tokens?.find((refreshToken) => {
        return isRefreshTokenValid(ids, refreshToken);
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
            .findByIds({ email, cellphone, document })
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
            user: UserMap.toDTO(user),
            token,
            refreshToken,
        };
    }
}

export default AuthenticateUserService;
