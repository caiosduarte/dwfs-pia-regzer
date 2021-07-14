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
var bcrypt_1 = require("bcrypt");
var AppError_1 = __importDefault(require("../../../errors/AppError"));
var createJwt_1 = require("../utils/createJwt");
var token_1 = require("../utils/token");
var verifyJwt_1 = require("../utils/verifyJwt");
var hasRefreshTokenValid = function (_a, tokens) {
    var email = _a.email, document = _a.document, cellphone = _a.cellphone;
    return !!(tokens === null || tokens === void 0 ? void 0 : tokens.find(function (refreshToken) {
        if (!token_1.isTokenExpired(refreshToken.expiresAt)) {
            try {
                var _a = verifyJwt_1.verifyRefreshToken(refreshToken.token), emailToken = _a.email, documentToken = _a.document, cellphoneToken = _a.cellphone;
                console.log({ email: email, document: document, cellphoneToken: cellphoneToken });
                console.log({ emailToken: emailToken, documentToken: documentToken, cellphoneToken: cellphoneToken });
                if (emailToken === email ||
                    documentToken === document ||
                    cellphoneToken === cellphone) {
                    return refreshToken;
                }
            }
            catch (_b) {
                console.error(refreshToken);
            }
        }
    }));
};
var AuthenticateUserService = (function () {
    function AuthenticateUserService(usersRepository, tokensRepository, dateProvider) {
        this.usersRepository = usersRepository;
        this.tokensRepository = tokensRepository;
        this.dateProvider = dateProvider;
    }
    AuthenticateUserService.prototype.execute = function (_a) {
        var email = _a.email, cellphone = _a.cellphone, document = _a.document, password = _a.password, remember = _a.remember;
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordValid, token, refreshTokenDays, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.usersRepository
                            .findBy({ email: email, cellphone: cellphone, document: document })
                            .then(function (result) { return result && result[0]; })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new AppError_1.default("Email/password don't match.", 404);
                        }
                        if (!password) return [3, 3];
                        return [4, bcrypt_1.compare(password, user.password)];
                    case 2:
                        passwordValid = _b.sent();
                        if (!passwordValid) {
                            throw new AppError_1.default("Email/password don't match.", 401);
                        }
                        return [3, 4];
                    case 3:
                        if (!hasRefreshTokenValid({ email: email, cellphone: cellphone, document: document }, user.tokens)) {
                            throw new AppError_1.default("Last entrance is too long or not found.", 401);
                        }
                        _b.label = 4;
                    case 4:
                        token = createJwt_1.createToken(user);
                        refreshTokenDays = remember ? 30 : 10;
                        refreshToken = createJwt_1.createRefreshToken(user, refreshTokenDays);
                        this.tokensRepository.create({
                            userId: user.id,
                            token: refreshToken,
                            expiresAt: this.dateProvider.addDays(refreshTokenDays),
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
                                    isConfirmed: user.isConfirmed,
                                },
                                token: token,
                                refreshToken: refreshToken,
                            }];
                }
            });
        });
    };
    return AuthenticateUserService;
}());
exports.default = AuthenticateUserService;
