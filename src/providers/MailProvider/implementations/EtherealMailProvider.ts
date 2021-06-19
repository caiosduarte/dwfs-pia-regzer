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

    private client: Transporter;

    private constructor() {}

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        nodemailer
            .createTestAccount()
            .then((account) => {
                return (
                    this.client ||
                    nodemailer.createTransport({
                        host: account.smtp.host,
                        port: account.smtp.port,
                        secure: account.smtp.secure,
                        auth: {
                            user: account.user,
                            pass: account.pass,
                        },
                    })
                );
            })
            .then((transporter) => {
                this.client = transporter;
                return this.client.sendMail({
                    to,
                    from: "Regzer <noreplay@regzer.com.br>",
                    subject,
                    html: templateHTML,
                });
            })
            .then((message) => {
                console.log("Message sent: %s", message.messageId);
                console.log(
                    "Preview URL: %s",
                    nodemailer.getTestMessageUrl(message)
                );
            })
            .catch((err) => {
                console.error(
                    "Failed to create a testing account. " + err.message
                );
            });
    }
}
