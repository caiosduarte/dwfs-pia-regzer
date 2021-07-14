"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
function createJwt(_a) {
    var payload = _a.payload, secret = _a.secret, subject = _a.subject, expiresIn = _a.expiresIn;
    return jsonwebtoken_1.sign(payload, secret, {
        subject: subject,
        expiresIn: expiresIn,
    });
}
var createToken = function (_a, minutes) {
    var id = _a.id, isAdmin = _a.isAdmin, roles = _a.roles, permissions = _a.permissions;
    return createJwt({
        payload: { isAdmin: isAdmin, roles: roles, permissions: permissions },
        secret: auth_1.default.jwt.tokenSecret,
        subject: id,
        expiresIn: typeof minutes === "number"
            ? minutes + "m"
            : minutes || auth_1.default.jwt.tokenExpiresIn,
    });
};
exports.createToken = createToken;
var createRefreshToken = function (_a, days) {
    var id = _a.id, email = _a.email, document = _a.document, cellphone = _a.cellphone;
    return createJwt({
        payload: { email: email, document: document, cellphone: cellphone },
        secret: auth_1.default.jwt.refreshTokenSecret,
        subject: id,
        expiresIn: typeof days === "number"
            ? days + "d"
            : days || auth_1.default.jwt.refreshTokenExpiresIn,
    });
};
exports.createRefreshToken = createRefreshToken;
