import { v4 as uuidV4 } from "uuid";
import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dTOs/ICreateTokenDTO";
import Token from "../models/Token";
import IUsersRepository from "../repositories/IUsersRepository";
import IMailProvider from "../utils/IMailProvider";
import DateProvider from "../utils/implementations/DateProvider";

export default class SendForgotPasswordMailService {
    constructor(
        private repository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        // gera um token para acessar o link de e-mail
        const newToken = new Token();

        Object.assign(newToken, {
            userId: user.id,
            token: uuidV4(),
            expiresAt: new DateProvider().addMinutes(180),
        } as ICreateTokenDTO);

        // envia o email para o usuário
        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            `Olá ${user.name}! Segue o link para recuperação de senha: ${newToken.token}`
        );

        // grava o token do email

        user.tokens.push(newToken);

        await this.repository.save(user);
    }
}
