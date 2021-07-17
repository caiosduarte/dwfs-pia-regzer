"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../modules/users/controllers");
var DayjsProvider_1 = __importDefault(require("../providers/DateProvider/implementations/DayjsProvider"));
var TokensRepository_1 = __importDefault(require("../repositories/TokensRepository"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var mailProvider_1 = __importDefault(require("../utils/mailProvider"));
var passwordRoutes = express_1.Router();
passwordRoutes.post("/forgot", function (request, response) {
    var usersRepository = UsersRepository_1.default.getInstance();
    var tokensRepository = TokensRepository_1.default.getInstance();
    var dateProvider = DayjsProvider_1.default.getInstance();
    return controllers_1.sendForgotPasswordMailController(usersRepository, tokensRepository, mailProvider_1.default(), dateProvider).handle(request, response);
});
passwordRoutes.patch("/reset", function (request, response) {
    var repository = TokensRepository_1.default.getInstance();
    return controllers_1.resetPasswordController(repository).handle(request, response);
});
exports.default = passwordRoutes;
