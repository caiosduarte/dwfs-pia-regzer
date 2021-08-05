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
var Enum_1 = require("./Enum");
var User_1 = __importDefault(require("./User"));
var Individual_1 = __importDefault(require("./Individual"));
var Company_1 = __importDefault(require("./Company"));
var PersonDocument_1 = __importDefault(require("./PersonDocument"));
var Person = (function () {
    function Person() {
        this.personType = this.individual || this.company;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_id", update: true }),
        __metadata("design:type", String)
    ], Person.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.default; }, {
            eager: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            primary: true,
        }),
        typeorm_1.JoinColumn({ name: "person_id", referencedColumnName: "id" }),
        __metadata("design:type", User_1.default)
    ], Person.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ enum: Enum_1.ALL_PERSON_TYPES }),
        __metadata("design:type", String)
    ], Person.prototype, "type", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Individual_1.default; }, function (individual) { return individual.person; }, {
            cascade: true,
            eager: true,
        }),
        __metadata("design:type", Individual_1.default)
    ], Person.prototype, "individual", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Company_1.default; }, function (company) { return company.person; }, {
            cascade: true,
            eager: true,
        }),
        __metadata("design:type", Company_1.default)
    ], Person.prototype, "company", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Person.prototype, "cellphone", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Person.prototype, "telephone", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_valid", default: false }),
        __metadata("design:type", Boolean)
    ], Person.prototype, "isValid", void 0);
    __decorate([
        typeorm_1.Column({ name: "valid_at", nullable: true }),
        __metadata("design:type", Date)
    ], Person.prototype, "validAt", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return PersonDocument_1.default; }, function (doc) { return doc.person; }),
        __metadata("design:type", Array)
    ], Person.prototype, "documents", void 0);
    Person = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [])
    ], Person);
    return Person;
}());
exports.default = Person;
