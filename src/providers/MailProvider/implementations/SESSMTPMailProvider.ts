import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import IMailProvider from "../../../modules/users/providers/IMailProvider";

export default class SESSMTPMailProvider implements IMailProvider {
    private static INSTANCE: SESSMTPMailProvider;

    static getInstance(): SESSMTPMailProvider {
        if (!SESSMTPMailProvider.INSTANCE) {
            SESSMTPMailProvider.INSTANCE = new SESSMTPMailProvider();
        }
        return SESSMTPMailProvider.INSTANCE;
    }

    private client: Transporter;

    private constructor() {
        this.client = nodemailer.createTransport({
            auth: {
                user: `${process.env.AWS_SES_SMTP_USERNAME}`,
                pass: `${process.env.AWS_SES_SMTP_PASSWORD}`,
            },
            host: `${process.env.AWS_SES_SMTP_HOST}`,
            port: Number(process.env.AWS_SES_SMTP_PORT),
            secure: true,
            debug: true,
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

        const result = await this.client.sendMail({
            // Custom headers for configuration set and message tags.
            /*
            headers: {
                //'X-SES-CONFIGURATION-SET': configurationSet,
                "X-SES-MESSAGE-TAGS": tag0, // const tag0 = "key0=value0";
                "X-SES-MESSAGE-TAGS": tag1,
            },*/
            from: `${process.env.SEND_MAIL}`,
            to,
            subject,
            /* text: */
            html: templateHTML,
        });

        console.log("SES SMTP send info: ", result);
    }
}
