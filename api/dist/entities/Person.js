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
var Person = (function () {
    function Person() {
        this.isValid = !!this.validatedAt;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_id", update: true }),
        __metadata("design:type", String)
    ], Person.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.default; }, {
            eager: true,
            cascade: ["update"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            primary: true,
        }),
        typeorm_1.JoinColumn({ name: "person_id", referencedColumnName: "id" }),
        __metadata("design:type", Object)
    ], Person.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ enum: Enum_1.ALL_PERSON_TYPES }),
        __metadata("design:type", String)
    ], Person.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Person.prototype, "cellphone", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Person.prototype, "telephone", void 0);
    __decorate([
        typeorm_1.Column({ name: "validated_at", nullable: true }),
        __metadata("design:type", Date)
    ], Person.prototype, "validatedAt", void 0);
    Person = __decorate([
        typeorm_1.Entity(),
        typeorm_1.TableInheritance({
            pattern: "STI",
            column: {
                name: "type",
                enum: Enum_1.ALL_PERSON_TYPES,
                update: true,
            },
        }),
        __metadata("design:paramtypes", [])
    ], Person);
    return Person;
}());
exports.default = Person;
