"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Document_1 = __importDefault(require("./Document"));
var Enum_1 = require("./Enum");
var User_1 = __importDefault(require("./User"));
var Person = /** @class */ (function () {
    function Person(type) {
        this.type = type;
    }
    __decorate([
        typeorm_1.Column({ primary: true }),
        __metadata("design:type", String)
    ], Person.prototype, "person_id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.default; }, { primary: true }),
        typeorm_1.JoinColumn({ name: "person_id" /* , referencedColumnName: "user_id"  */ }),
        __metadata("design:type", User_1.default)
    ], Person.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ enum: Enum_1.ALL_PERSON_TYPES }),
        __metadata("design:type", String)
    ], Person.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Person.prototype, "cellphone", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Person.prototype, "telephone", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_valid", default: false }),
        __metadata("design:type", Boolean)
    ], Person.prototype, "isValid", void 0);
    __decorate([
        typeorm_1.Column({ name: "valid_at" }),
        __metadata("design:type", Date)
    ], Person.prototype, "validAt", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Document_1.default; }, function (document) { return document.person; }),
        __metadata("design:type", Array)
    ], Person.prototype, "documents", void 0);
    Person = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [String])
    ], Person);
    return Person;
}());
exports.default = Person;
