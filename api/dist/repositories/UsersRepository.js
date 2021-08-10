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
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("../entities/User"));
var class_validator_1 = require("class-validator");
var UsersRepository = (function () {
    function UsersRepository() {
        this.limit = 25;
        this.repository = typeorm_1.getRepository(User_1.default);
        this.INSTANCE = this;
    }
    UsersRepository.getInstance = function () {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }
        return UsersRepository.INSTANCE;
    };
    UsersRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.repository.create(data);
                return [2, this.save(user)];
            });
        });
    };
    UsersRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.findOne(id, {
                            relations: ["tokens"],
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    UsersRepository.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, class_validator_1.validate(user)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length > 0) {
                            throw new Error(errors.join(", "));
                        }
                        return [4, this.repository.save(user)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    UsersRepository.prototype.findByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository
                            .createQueryBuilder("user")
                            .innerJoinAndSelect("user.tokens", "token")
                            .where("token.token = :token", { token: token })
                            .getOne()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    UsersRepository.prototype.findByIds = function (_a) {
        var id = _a.id, email = _a.email, document = _a.document, cellphone = _a.cellphone;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.repository.findOne({
                            relations: ["tokens"],
                            where: [{ id: id }, { email: email }, { document: document }, { cellphone: cellphone }],
                            cache: true,
                        })];
                    case 1: return [2, _b.sent()];
                }
            });
        });
    };
    UsersRepository.prototype.find = function (_a) {
        var start = _a.start, _b = _a.offset, offset = _b === void 0 ? this.limit : _b;
        return __awaiter(this, void 0, void 0, function () {
            var queryBuilder;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        queryBuilder = this.repository
                            .createQueryBuilder("user")
                            .leftJoin("user.person", "person")
                            .addSelect("person.type")
                            .orderBy({
                            "user.updatedAt": "DESC",
                            "user.name": "ASC",
                        })
                            .cache(true);
                        if (isNaN(Number(start)) ||
                            isNaN(Number(offset)) ||
                            offset > this.limit) {
                            queryBuilder.limit(this.limit);
                        }
                        else {
                            queryBuilder.skip(start).take(offset);
                        }
                        return [4, queryBuilder.getMany()];
                    case 1: return [2, _c.sent()];
                }
            });
        });
    };
    return UsersRepository;
}());
exports.default = UsersRepository;
