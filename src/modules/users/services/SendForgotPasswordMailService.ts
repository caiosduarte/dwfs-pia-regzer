import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";
import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import IDateProvider from "../providers/IDateProvider";
import IMailProvider from "../providers/IMailProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import IUsersRepository from "../repositories/IUsersRepository";

export default class SendForgotPasswordMailService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokensRepository: ITokensRepository,
        private mailProvider: IMailProvider,
        private dateProvider: IDateProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        // gera um token para acessar o link de e-mail
        const newToken = await this.tokensRepository.create({
            userId: user.id,
            token: uuidV4(),
            expiresAt: this.dateProvider.addMinutes(180),
        } as ICreateTokenDTO);

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
