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
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../config/upload"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var CreateDocumentController_1 = __importDefault(require("../modules/people/controllers/CreateDocumentController"));
var PersonMap_1 = require("../mappers/PersonMap");
var CreateDocumentService_1 = __importDefault(require("../modules/people/services/CreateDocumentService"));
var AWSS3StorageProvider_1 = __importDefault(require("../providers/StorageProvider/implementations/AWSS3StorageProvider"));
var LocalStorageProvider_1 = require("../providers/StorageProvider/implementations/LocalStorageProvider");
var DocumentsRepository_1 = __importDefault(require("../repositories/DocumentsRepository"));
var PeopleRepository_1 = __importDefault(require("../repositories/PeopleRepository"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var peopleRoutes = express_1.Router();
var uploadDocuments = multer_1.default(upload_1.default);
peopleRoutes.use(ensureAuthenticated_1.ensureAuthenticated);
function diskStorage() {
    switch (process.env.STORAGE) {
        case "local":
            return LocalStorageProvider_1.LocalStorageProvider.getInstance();
        case "s3":
            return AWSS3StorageProvider_1.default.getInstance();
        default:
            return LocalStorageProvider_1.LocalStorageProvider.getInstance();
    }
}
peopleRoutes.post("/", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, type, _b, email, document, isAdmin, usersRepo, user, repository, person;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = request.body, id = _a.id, type = _a.type;
                _b = request.body, email = _b.email, document = _b.document, isAdmin = _b.isAdmin;
                if (!id || !type) {
                    throw new AppError_1.default("Wrong parameters.", 403);
                }
                usersRepo = UsersRepository_1.default.getInstance();
                return [4, usersRepo.findById(id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    throw new AppError_1.default("User not found", 404);
                }
                if (email !== user.email) {
                    user.confirmedAt = undefined;
                }
                repository = PeopleRepository_1.default.getInstance();
                return [4, repository.create({
                        id: id,
                        type: type,
                        user: { id: id, email: email, document: document, validatedAt: new Date() },
                    })];
            case 2:
                person = _c.sent();
                return [2, response.status(201).json(PersonMap_1.PersonMapper.toDTO(person))];
        }
    });
}); });
peopleRoutes.get("/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, repository, person;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                repository = PeopleRepository_1.default.getInstance();
                return [4, repository.findById(id)];
            case 1:
                person = _a.sent();
                return [2, response.json(PersonMap_1.PersonMapper.toDTO(person))];
        }
    });
}); });
peopleRoutes.get("/", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, start, offset, repository, people;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.query, start = _a.start, offset = _a.offset;
                repository = PeopleRepository_1.default.getInstance();
                return [4, repository.find({
                        start: Number(start),
                        offset: Number(offset),
                    })];
            case 1:
                people = _b.sent();
                console.log("People ", people);
                return [2, response.json(PersonMap_1.PersonMapper.toDTO(people))];
        }
    });
}); });
peopleRoutes.post("/:id/document", uploadDocuments.array("files"), function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var storageProvider, service, controller;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storageProvider = diskStorage();
                service = new CreateDocumentService_1.default(DocumentsRepository_1.default.getInstance(), storageProvider);
                controller = new CreateDocumentController_1.default(service);
                return [4, controller.handle(request, response)];
            case 1: return [2, _a.sent()];
        }
    });
}); });
exports.default = peopleRoutes;
