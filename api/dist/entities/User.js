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
var class_validator_1 = require("class-validator");
var uuid_1 = require("uuid");
var Embedded_1 = require("./Embedded");
var Token_1 = __importDefault(require("./Token"));
var User = (function () {
    function User() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "user_id" }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "document", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_admin", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isAdmin", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_confirmed", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isConfirmed", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_valid", default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isValid", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Embedded_1.Dated; }, { prefix: false }),
        __metadata("design:type", Embedded_1.Dated)
    ], User.prototype, "dated", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Token_1.default; }, function (token) { return token.user; }, {
            cascade: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", Array)
    ], User.prototype, "tokens", void 0);
    User = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [])
    ], User);
    return User;
}());
exports.default = User;
