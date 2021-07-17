import IMailProvider from "../modules/users/providers/IMailProvider";
import EtherealMailProvider from "../providers/MailProvider/implementations/EtherealMailProvider";
import SESMailProvider from "../providers/MailProvider/implementations/SESMailProvider";
import SESSMTPMailProvider from "../providers/MailProvider/implementations/SESSMTPMailProvider";

const mailProvider = (): IMailProvider => {
    const provider = process.env.MAIL_PROVIDER;
    console.log("mail provider => ", provider);
    switch (process.env.MAIL_PROVIDER) {
        case "ethereal":
            return EtherealMailProvider.getInstance();
        case "ses":
            return SESMailProvider.getInstance();
        case "smtp":
            return SESSMTPMailProvider.getInstance();
        default:
            return EtherealMailProvider.getInstance();
    }
};

export default mailProvider;
