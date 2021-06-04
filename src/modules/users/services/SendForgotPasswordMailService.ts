import { resolve } from "path";
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

        // grava o token do email

        user.tokens?.push(newToken);

        await this.repository.save(user);

        // envia o email para o usuário

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${newToken.token}`,
        };

        const templatePath = resolve(
            __dirname,
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}
