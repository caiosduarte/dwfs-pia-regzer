"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.sendForgotPasswordMailController = exports.refreshTokenController = exports.createUserController = exports.authenticateUserController = void 0;
var AuthenticateUserService_1 = __importDefault(require("../services/AuthenticateUserService"));
var CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
var RefreshTokenService_1 = __importDefault(require("../services/RefreshTokenService"));
var ResetPasswordService_1 = __importDefault(require("../services/ResetPasswordService"));
var SendForgotPasswordMailService_1 = __importDefault(require("../services/SendForgotPasswordMailService"));
var AuthenticateUserController_1 = __importDefault(require("./AuthenticateUserController"));
var CreateUserController_1 = __importDefault(require("./CreateUserController"));
var RefreshTokenController_1 = __importDefault(require("./RefreshTokenController"));
var ResetPasswordController_1 = __importDefault(require("./ResetPasswordController"));
var SendForgotPasswordMailController_1 = __importDefault(require("./SendForgotPasswordMailController"));
var createUserController = function (repository) {
    var service = new CreateUserService_1.default(repository);
    return new CreateUserController_1.default(service);
};
exports.createUserController = createUserController;
function authenticateUserController(repository, tokensRepository, dateProvider) {
    var service = new AuthenticateUserService_1.default(repository, tokensRepository, dateProvider);
    return new AuthenticateUserController_1.default(service);
}
exports.authenticateUserController = authenticateUserController;
function refreshTokenController(repository) {
    var service = new RefreshTokenService_1.default(repository);
    return new RefreshTokenController_1.default(service);
}
exports.refreshTokenController = refreshTokenController;
var sendForgotPasswordMailController = function (usersRepository, tokensRepository, mailProvider, dateProvider) {
    var service = new SendForgotPasswordMailService_1.default(usersRepository, tokensRepository, mailProvider, dateProvider);
    return new SendForgotPasswordMailController_1.default(service);
};
exports.sendForgotPasswordMailController = sendForgotPasswordMailController;
function resetPasswordController(repository) {
    var service = new ResetPasswordService_1.default(repository);
    return new ResetPasswordController_1.default(service);
}
exports.resetPasswordController = resetPasswordController;
