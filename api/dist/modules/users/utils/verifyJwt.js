"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyRefreshToken = exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var auth_1 = __importDefault(require("../config/auth"));
function verifyJwt(token, secret) {
    try {
        var jwt = jsonwebtoken_1.verify(token, secret);
        if (!jwt.exp || typeof jwt.exp !== "number") {
            throw new AppError_1.default("JWT expiration is not defined.", 401);
        }
        return jwt;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new AppError_1.default("JWT expired at " + err.expiredAt + ".", 401);
        }
        throw new AppError_1.default("JWT invalid.", 401);
    }
}
function verifyToken(token) {
    return verifyJwt(token, auth_1.default.jwt.tokenSecret);
}
exports.verifyToken = verifyToken;
function verifyRefreshToken(token) {
    return verifyJwt(token, auth_1.default.jwt.refreshTokenSecret);
}
exports.verifyRefreshToken = verifyRefreshToken;
function decodeToken(token) {
    return jsonwebtoken_1.decode(token);
}
exports.decodeToken = decodeToken;
