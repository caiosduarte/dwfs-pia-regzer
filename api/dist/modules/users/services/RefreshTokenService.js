"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var createJwt_1 = require("../utils/createJwt");
var token_1 = require("../utils/token");
var verifyJwt_1 = require("../utils/verifyJwt");
var addDays = function (days, date) {
    if (date === void 0) { date = new Date(); }
    var result = !date ? new Date() : date;
    result.setDate(result.getDate() + days);
    return result;
};
var RefreshTokenService = (function () {
    function RefreshTokenService(repository) {
        this.repository = repository;
    }
    RefreshTokenService.prototype.execute = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, userId, oldRefreshToken, user, expiresAt, isRefreshTokenValid, newToken, refreshToken, newRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jwt = verifyJwt_1.decodeJwt(token);
                        userId = jwt === null || jwt === void 0 ? void 0 : jwt.sub;
                        return [4, this.repository.findByEncoded(token)];
                    case 1:
                        oldRefreshToken = _a.sent();
                        user = oldRefreshToken === null || oldRefreshToken === void 0 ? void 0 : oldRefreshToken.user;
                        if (!oldRefreshToken || !user || (user === null || user === void 0 ? void 0 : user.id) !== userId) {
                            throw new AppError_1.default("Refresh Token does not exists!", 401);
                        }
                        expiresAt = oldRefreshToken.expiresAt;
                        this.repository.deleteById(oldRefreshToken.id);
                        isRefreshTokenValid = function () { return !!token_1.verifyRefreshToken(token); };
                        if (token_1.isTokenExpired(expiresAt) || !isRefreshTokenValid()) {
                            throw new AppError_1.default("Refresh Token invalid.", 401);
                        }
                        newToken = createJwt_1.createToken(user);
                        refreshToken = createJwt_1.createRefreshToken(user, 10);
                        newRefreshToken = this.repository.create({
                            userId: userId,
                            token: refreshToken,
                            expiresAt: addDays(10),
                        });
                        return [2, {
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    document: user.document,
                                    cellphone: user.cellphone,
                                    isAdmin: user.isAdmin,
                                    roles: user.roles,
                                    permissions: user.permissions,
                                },
                                token: newToken,
                                refreshToken: refreshToken,
                            }];
                }
            });
        });
    };
    return RefreshTokenService;
}());
exports.default = RefreshTokenService;
