"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAllAsError = exports.errors = void 0;
var AppError_1 = __importDefault(require("../errors/AppError"));
var UserError_1 = __importDefault(require("../modules/users/errors/UserError"));
function catchAllAsError(err, request, response) {
    var statusCode = 500;
    var errorMessage = "Internal server error.";
    if (err instanceof Error) {
        errorMessage = err.message;
        if (err instanceof AppError_1.default) {
            statusCode = err.statusCode;
        }
        else {
            statusCode = 400;
        }
    }
    console.error(err);
    return response.status(statusCode).json({
        status: statusCode,
        message: errorMessage,
    });
}
exports.catchAllAsError = catchAllAsError;
function userError(err, request, response, next) {
    if (err instanceof UserError_1.default) {
        throw new AppError_1.default(err.message, err.statusCode);
    }
    return next(err);
}
var errors = [userError, catchAllAsError];
exports.errors = errors;
