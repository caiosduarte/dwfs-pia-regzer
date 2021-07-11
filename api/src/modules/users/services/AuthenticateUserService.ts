import { compare } from "bcrypt";
import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import { ITokenResponseDTO } from "../dtos/ITokenResponseDTO";
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import IUser from "../models/IUser";
import IDateProvider from "../providers/IDateProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { createRefreshToken, createToken } from "../utils/createJwt";

type Credentials = Pick<IUser, "email" | "document" | "cellphone" | "password">

type UserResponse = Omit<IUser, "password" | "tokens">;

class AuthenticateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokensRepository: ITokensRepository,
        private dateProvider: IDateProvider
    ) {}

    public async execute({ email, password }: Credentials): Promise<ITokenResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email/password don't match.", 401);
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            throw new AppError("Email/password don't match.", 401);
        }

        const token = createToken(user);

        const refreshToken = createRefreshToken(user);

        this.tokensRepository.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: this.dateProvider.addDays(10),
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
            },
            token,
            refreshToken,
        };
    }
}



export default AuthenticateUserService;
