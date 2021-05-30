import IMailProvider from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

export default class EtherealEmailProvider implements IMailProvider {
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
        body: string,
        bodyHtml?: string
    ): Promise<void> {
        const message = await this.transporter.sendMail({
            to,
            from: "Registration Analyzer <noreplay@registration_analyzer.com.br>",
            subject,
            text: body,
            html: bodyHtml || body,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
    }
}
