"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRefreshTokenValid = exports.isTokenExpired = exports.verifyRefreshToken = exports.verifyToken = void 0;
var auth_1 = __importDefault(require("../config/auth"));
var verifyJwt_1 = require("./verifyJwt");
function verifyToken(token) {
    return verifyJwt_1.verifyJwt(token, auth_1.default.jwt.tokenSecret);
}
exports.verifyToken = verifyToken;
function verifyRefreshToken(token) {
    return verifyJwt_1.verifyJwt(token, auth_1.default.jwt.refreshTokenSecret);
}
exports.verifyRefreshToken = verifyRefreshToken;
var isTokenExpired = function (expiredAt) {
    var expiresInMilis = expiredAt instanceof Date ? expiredAt.valueOf() : expiredAt;
    var currentMilis = Date.now();
    return !expiresInMilis || currentMilis > expiresInMilis;
};
exports.isTokenExpired = isTokenExpired;
var hasIdValid = function (ids, token) {
    try {
        var _a = verifyRefreshToken(token), emailToken = _a.email, documentToken = _a.document, cellphoneToken = _a.cellphone;
        var email = ids.email, document_1 = ids.document, cellphone = ids.cellphone;
        if (emailToken === email ||
            documentToken === document_1 ||
            cellphoneToken === cellphone) {
            return true;
        }
    }
    catch (_b) { }
    return false;
};
var isRefreshTokenValid = function (ids, refreshToken) {
    return (!exports.isTokenExpired(refreshToken.expiresAt) &&
        hasIdValid(ids, refreshToken.token));
};
exports.isRefreshTokenValid = isRefreshTokenValid;
