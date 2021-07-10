import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { SES } from "aws-sdk";
import IMailProvider from "../../../modules/users/providers/IMailProvider";

export default class SESMailProvider implements IMailProvider {
    private static INSTANCE: SESMailProvider;

    static getInstance(): SESMailProvider {
        if (!SESMailProvider.INSTANCE) {
            SESMailProvider.INSTANCE = new SESMailProvider();
        }
        return SESMailProvider.INSTANCE;
    }

    private client: Transporter;

    private constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-01",
                region: `${process.env.AWS_REGION}`,
                credentials: {
                    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
                },
            }),
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

        await this.client.sendMail({
            to,
            from: `${process.env.SEND_MAIL}`,
            subject,
            html: templateHTML,
        });
    }
}
