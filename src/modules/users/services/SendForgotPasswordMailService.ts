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
            throw new AppError("User/email does not exists!");
        }

        const token = uuidV4();

        // envia o email para o usuário

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
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

        // gera um token para acessar o link de e-mail
        await this.tokensRepository.create({
            userId: user.id,
            token,
            expiresAt: this.dateProvider.addMinutes(180),
        } as ICreateTokenDTO);
    }
}
