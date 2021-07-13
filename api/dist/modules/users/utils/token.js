"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = void 0;
var isTokenExpired = function (expiredAt) {
    var expiresInMilis = expiredAt instanceof Date ? expiredAt.valueOf() : expiredAt;
    var currentMilis = Date.now();
    return !expiresInMilis || currentMilis > expiresInMilis;
};
exports.isTokenExpired = isTokenExpired;
