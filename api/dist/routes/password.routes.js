"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../modules/users/controllers");
var DayjsProvider_1 = __importDefault(require("../providers/DateProvider/implementations/DayjsProvider"));
var EtherealMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/EtherealMailProvider"));
var SESMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/SESMailProvider"));
var SESSMTPMailProvider_1 = __importDefault(require("../providers/MailProvider/implementations/SESSMTPMailProvider"));
var TokensRepository_1 = __importDefault(require("../repositories/TokensRepository"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var passwordRoutes = express_1.Router();
function mailProvider() {
    switch (process.env.MAIL_PROVIDER) {
        case "ethereal":
            return EtherealMailProvider_1.default.getInstance();
        case "ses":
            return SESMailProvider_1.default.getInstance();
        case "smtp":
        default:
            return SESSMTPMailProvider_1.default.getInstance();
    }
}
passwordRoutes.post("/forgot", function (request, response) {
    var usersRepository = UsersRepository_1.default.getInstance();
    var tokensRepository = TokensRepository_1.default.getInstance();
    var mail = mailProvider();
    var dateProvider = DayjsProvider_1.default.getInstance();
    return controllers_1.sendForgotPasswordMailController(usersRepository, tokensRepository, mail, dateProvider).handle(request, response);
});
passwordRoutes.post("/reset", function (request, response) {
    var repository = TokensRepository_1.default.getInstance();
    return controllers_1.resetPasswordController(repository).handle(request, response);
});
exports.default = passwordRoutes;
