"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EtherealMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/EtherealMailProvider"));
var SESMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/SESMailProvider"));
var SESSMTPMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/SESSMTPMailProvider"));
var mailProvider = function () {
    var provider = process.env.MAIL_PROVIDER;
    console.log("mail provider => ", provider);
    switch (process.env.MAIL_PROVIDER) {
        case "ethereal":
            return EtherealMailProvider_1.default.getInstance();
        case "ses":
            return SESMailProvider_1.default.getInstance();
        case "smtp":
            return SESSMTPMailProvider_1.default.getInstance();
        default:
            return EtherealMailProvider_1.default.getInstance();
    }
};
exports.default = mailProvider;
