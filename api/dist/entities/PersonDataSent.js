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
var Person_1 = __importDefault(require("./Person"));
var User_1 = __importDefault(require("./User"));
var PersonDataSent = (function () {
    function PersonDataSent() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_data_sent_id" }),
        __metadata("design:type", String)
    ], PersonDataSent.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Person_1.default; }, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn({ name: "person_id" }),
        __metadata("design:type", Person_1.default)
    ], PersonDataSent.prototype, "person", void 0);
    __decorate([
        typeorm_1.Column({ name: "field_name" }),
        __metadata("design:type", String)
    ], PersonDataSent.prototype, "field", void 0);
    __decorate([
        typeorm_1.Column({ name: "old_value", type: "text" }),
        __metadata("design:type", String)
    ], PersonDataSent.prototype, "oldValue", void 0);
    __decorate([
        typeorm_1.Column({ name: "new_value", type: "text" }),
        __metadata("design:type", String)
    ], PersonDataSent.prototype, "newValue", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn({ name: "analyst_id" }),
        __metadata("design:type", User_1.default)
    ], PersonDataSent.prototype, "analyst", void 0);
    __decorate([
        typeorm_1.Column({ name: "user_message", type: "text" }),
        __metadata("design:type", String)
    ], PersonDataSent.prototype, "userMessage", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_valid", default: false }),
        __metadata("design:type", Boolean)
    ], PersonDataSent.prototype, "isValid", void 0);
    __decorate([
        typeorm_1.Column({ name: "valid_at" }),
        __metadata("design:type", Date)
    ], PersonDataSent.prototype, "validAt", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Embedded_1.Dated; }, { prefix: false }),
        __metadata("design:type", Embedded_1.Dated)
    ], PersonDataSent.prototype, "dated", void 0);
    PersonDataSent = __decorate([
        typeorm_1.Entity({ name: "person_data_sent" }),
        __metadata("design:paramtypes", [])
    ], PersonDataSent);
    return PersonDataSent;
}());
exports.default = PersonDataSent;
