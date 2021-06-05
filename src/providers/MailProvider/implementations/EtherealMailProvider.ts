import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import IMailProvider from "../../../modules/users/providers/IMailProvider";

export default class EtherealMailProvider implements IMailProvider {
    private static INSTANCE: EtherealMailProvider;

    static getInstance(): EtherealMailProvider {
        if (!EtherealMailProvider.INSTANCE) {
            EtherealMailProvider.INSTANCE = new EtherealMailProvider();
        }
        return EtherealMailProvider.INSTANCE;
    }

    private transporter: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                this.transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
            })
            .catch((err) => {
                console.error(
                    "Failed to create a testing account. " + err.message
                );
            });
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = await this.transporter.sendMail({
            to,
            from: "Regzer <noreplay@regzer.com.br>",
            subject,
            html: templateHTML,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}
