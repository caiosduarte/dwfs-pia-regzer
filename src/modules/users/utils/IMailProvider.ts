export default interface IMailProvider {
    sendMail(
        to: string,
        subject: string,
        body: string,
        bodyHtml?: string
    ): Promise<void>;
}
