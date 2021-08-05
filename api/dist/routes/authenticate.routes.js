"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = require("express");
var AppError_1 = __importDefault(require("../errors/AppError"));
var controllers_1 = require("../modules/users/controllers");
var mappers_1 = __importDefault(require("../mappers"));
var request_1 = require("../modules/users/utils/request");
var request_2 = require("../modules/users/utils/request");
var token_1 = require("../modules/users/utils/token");
var DayjsProvider_1 = __importDefault(require("../providers/DateProvider/implementations/DayjsProvider"));
var TokensRepository_1 = __importDefault(require("../repositories/TokensRepository"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var authenticateRoutes = express_1.Router();
authenticateRoutes.post("/sessions", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var usersRepo, tokensRepo, dateProvider;
    return __generator(this, function (_a) {
        usersRepo = UsersRepository_1.default.getInstance();
        tokensRepo = TokensRepository_1.default.getInstance();
        dateProvider = DayjsProvider_1.default.getInstance();
        return [2, controllers_1.authenticateUserController(usersRepo, tokensRepo, dateProvider).handle(request, response)];
    });
}); });
authenticateRoutes.get("/sessions", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var token, ids, id_1, repository, id, email, cellphone, document, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = request_2.getTokenFromRequest(request);
                ids = request.query;
                if (!request_1.hasAnyId(ids)) {
                    if (token) {
                        id_1 = token_1.verifyToken(token).sub;
                        ids = __assign(__assign({}, ids), { id: id_1 });
                    }
                    else {
                        throw new AppError_1.default("No params.", 403);
                    }
                }
                repository = UsersRepository_1.default.getInstance();
                id = ids.id, email = ids.email, cellphone = ids.cellphone, document = ids.document;
                if (!id) return [3, 2];
                return [4, repository.findById(id)];
            case 1:
                _a = _b.sent();
                return [3, 4];
            case 2: return [4, repository
                    .findByIds({ id: id, email: email, cellphone: cellphone, document: document })
                    .then(function (users) { return users && users[0]; })
                    .then(function (user) {
                    if (!user)
                        throw new AppError_1.default("User not found.", 404);
                    var tokens = user === null || user === void 0 ? void 0 : user.tokens;
                    var isValid = !!(tokens === null || tokens === void 0 ? void 0 : tokens.find(function (token) {
                        return token_1.isRefreshTokenValid({ email: email, cellphone: cellphone, document: document }, token);
                    }));
                    if (isValid) {
                        return user;
                    }
                    throw new AppError_1.default("User unauthorized.", 401);
                })];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                user = _a;
                if (!user) {
                    throw new AppError_1.default("User not found.", 404);
                }
                return [2, response.json({ user: mappers_1.default.toDTO(user) })];
        }
    });
}); });
authenticateRoutes.post("/refresh-token", function (request, response) {
    var repository = TokensRepository_1.default.getInstance();
    return controllers_1.refreshTokenController(repository).handle(request, response);
});
exports.default = authenticateRoutes;
