import { hash } from "bcrypt";
import { getRepository } from "typeorm";
import AppError from "../../../errors/AppError";
import Token from "../models/Token";
import User from "../models/User";
import UsersRepository from "../repositories/implementations/UsersRepository";
import ITokensRepository from "../repositories/ITokensRepository";

interface IRequest {
    tokenEncoded: string;
    password: string;
}

export default class ResetPasswordService {
    constructor(private repository: ITokensRepository) {}

    async execute({ tokenEncoded, password }: IRequest): Promise<void> {
        const usersRepository = UsersRepository.getInstance();
        const userFromToken = await usersRepository.findByToken(
            "fe84818c-dd94-473a-8dcf-ef7e6f40cacc"
        );

        console.log("User => ", userFromToken);

        if (userFromToken) {
            const tokens = userFromToken.tokens;
            const token = tokens?.shift();

            console.log("Token => ", token);

            //delete userFromToken.tokens;
            usersRepository.save(userFromToken);
            console.log("User => ", userFromToken);
        }

        //const userFromArray = new User();

        //Object.assign(userFromArray, arrayUsers[0] as User);

        //console.log("userByToken => ", userFromArray);

        /*

        const token = await this.repository.findByEncoded(tokenEncoded);

        const user = token?.user;

        console.log("Token => $", token);

        if (!token || !user) {
            throw new AppError("Token invalid!");
        }

        // verifica se token expirado

        const currentDate = new Date();
        const expiresDate = token.expiresAt;

        if (!expiresDate || currentDate.getTime() > expiresDate.getTime()) {
            throw new AppError("Token expired!");
        }

        // atualiza o password
        user.password = await hash(password, 8);

        // salva a senha do usuário e remove o token

        const tokenId = token.id;

        await this.repository.save(token);

        //await this.repository.deleteById(tokenId);

        */
    }
}
