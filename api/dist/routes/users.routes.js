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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AppError_1 = __importDefault(require("../errors/AppError"));
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var controllers_1 = require("../modules/users/controllers");
var UserMap_1 = __importDefault(require("../modules/users/mappers/UserMap"));
var ConfirmUserService_1 = __importDefault(require("../modules/users/services/ConfirmUserService"));
var SendConfirmMailService_1 = __importDefault(require("../modules/users/services/SendConfirmMailService"));
var DayjsProvider_1 = __importDefault(require("../providers/DateProvider/implementations/DayjsProvider"));
var TokensRepository_1 = __importDefault(require("../repositories/TokensRepository"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var mailProvider_1 = __importDefault(require("../utils/mailProvider"));
var usersRouter = express_1.Router();
usersRouter.post("/", function (request, response) {
    var usersRepo = UsersRepository_1.default.getInstance();
    var tokensRepo = TokensRepository_1.default.getInstance();
    var dateProvider = DayjsProvider_1.default.getInstance();
    return controllers_1.createUserController(usersRepo, tokensRepo, mailProvider_1.default(), dateProvider).handle(request, response);
});
usersRouter.get("/:id", ensureAuthenticated_1.ensureAuthenticated, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, usersRepository, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                usersRepository = UsersRepository_1.default.getInstance();
                return [4, usersRepository.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1.default("User not found!", 404);
                }
                return [2, response.json(UserMap_1.default.toDTO(user))];
        }
    });
}); });
var hasAnyId = function (_a) {
    var email = _a.email, document = _a.document, cellphone = _a.cellphone, id = _a.id;
    return !!email || !!document || !!cellphone || !!id;
};
var findUsers = function (query, repository) { return __awaiter(void 0, void 0, void 0, function () {
    var email, document, cellphone, start, offset, start_1, offset_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = query.email, document = query.document, cellphone = query.cellphone, start = query.start, offset = query.offset;
                if (!hasAnyId(query)) return [3, 2];
                return [4, repository.findBy({
                        email: email,
                        document: document,
                        cellphone: cellphone,
                    })];
            case 1: return [2, _a.sent()];
            case 2:
                start_1 = Number(query.start);
                offset_1 = Number(query.offset);
                return [4, repository.find({ start: start_1, offset: offset_1 })];
            case 3: return [2, _a.sent()];
        }
    });
}); };
usersRouter.get("/", ensureAuthenticated_1.ensureAuthenticated, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var repository, query, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                repository = UsersRepository_1.default.getInstance();
                query = request.query;
                return [4, findUsers(query, repository).then(function (users) {
                        return users === null || users === void 0 ? void 0 : users.reduce(function (dtos, user) { return __spreadArray(__spreadArray([], dtos), [
                            UserMap_1.default.toDTO(user),
                        ]); }, []);
                    })];
            case 1:
                users = _a.sent();
                if (!users) {
                    throw new AppError_1.default("User not found.", 404);
                }
                return [2, response.json(users)];
        }
    });
}); });
usersRouter.post("/confirm", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, usersRepository, tokensRepository, dateProvider, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = request.body.email;
                if (!hasAnyId({ email: email })) return [3, 2];
                usersRepository = UsersRepository_1.default.getInstance();
                tokensRepository = TokensRepository_1.default.getInstance();
                dateProvider = DayjsProvider_1.default.getInstance();
                service = new SendConfirmMailService_1.default(usersRepository, tokensRepository, mailProvider_1.default(), dateProvider);
                return [4, service.execute(email)];
            case 1:
                _a.sent();
                return [2, response.status(201).send()];
            case 2: throw new AppError_1.default("No ID found.", 403);
        }
    });
}); });
usersRouter.patch("/confirm", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var token, repository, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = request.query.token;
                console.log("Token request ", String(token));
                repository = TokensRepository_1.default.getInstance();
                service = new ConfirmUserService_1.default(repository);
                return [4, service.execute(String(token))];
            case 1:
                _a.sent();
                return [2, response.status(204).send()];
        }
    });
}); });
exports.default = usersRouter;
