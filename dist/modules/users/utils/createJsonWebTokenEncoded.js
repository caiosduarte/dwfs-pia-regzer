"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function createJsonWebTokenEncoded(_a) {
    var payload = _a.payload, secret = _a.secret, subject = _a.subject, expiresIn = _a.expiresIn;
    return jsonwebtoken_1.sign({ payload: payload }, secret, {
        subject: subject,
        expiresIn: expiresIn,
    });
}
exports.default = createJsonWebTokenEncoded;
