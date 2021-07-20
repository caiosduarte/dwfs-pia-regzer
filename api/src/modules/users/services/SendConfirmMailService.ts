import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";
import AppError from "../../../errors/AppError";
import ICreateTokenDTO from "../dtos/ICreateTokenDTO";
import IDateProvider from "../providers/IDateProvider";
import IMailProvider from "../providers/IMailProvider";
import ITokensRepository from "../repositories/ITokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

export default class SendConfirmMailService {
    constructor(
        private usersRepository: IUsersRepository,
        private tokensRepository: ITokensRepository,
        private mailProvider: IMailProvider,
        private dateProvider: IDateProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user || !user.email) {
            throw new AppError("User/email does not exists", 404);
        }

        const token = uuidV4();

        // envia o email para o usuário

        const variables = {
            name: user.name,
            link: `${process.env.CONFIRM_MAIL_URL}${token}?email=${user.email}`,
        };

        const templatePath = resolve(
            __dirname,
            "..",
            "views",
            "emails",
            "confirmRegistration.hbs"
        );

        await this.mailProvider.sendMail(
            user.email,
            "Confirmação de registro",
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
