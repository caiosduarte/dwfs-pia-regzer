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
var uuid_1 = require("uuid");
var Embedded_1 = require("./Embedded");
var User_1 = __importDefault(require("./User"));
var Token = (function () {
    function Token() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "user_token_id" }),
        __metadata("design:type", String)
    ], Token.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.tokens; }, {
            cascade: ["update"],
        }),
        typeorm_1.JoinColumn({ name: "user_id" }),
        __metadata("design:type", User_1.default)
    ], Token.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column({ name: "user_id" }),
        __metadata("design:type", String)
    ], Token.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Token.prototype, "token", void 0);
    __decorate([
        typeorm_1.Column({ name: "expires_at", type: "datetime" }),
        __metadata("design:type", Date)
    ], Token.prototype, "expiresAt", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Embedded_1.CreatedTimestamp; }, { prefix: false }),
        __metadata("design:type", Embedded_1.CreatedTimestamp)
    ], Token.prototype, "created", void 0);
    Token = __decorate([
        typeorm_1.Entity("user_token"),
        __metadata("design:paramtypes", [])
    ], Token);
    return Token;
}());
exports.default = Token;
