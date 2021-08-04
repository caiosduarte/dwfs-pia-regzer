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
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Person_1 = __importDefault(require("./Person"));
var Company = (function () {
    function Company() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_company_id" }),
        __metadata("design:type", String)
    ], Company.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Person_1.default; }, function (person) { return person.company; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        typeorm_1.JoinColumn({
            name: "person_company_id",
            referencedColumnName: "id",
        }),
        __metadata("design:type", Person_1.default)
    ], Company.prototype, "person", void 0);
    __decorate([
        typeorm_1.Column({ name: "fantasy_name" }),
        __metadata("design:type", String)
    ], Company.prototype, "fantasyName", void 0);
    __decorate([
        typeorm_1.Column({ name: "open_date", type: "date" }),
        class_validator_1.IsDate(),
        __metadata("design:type", Date)
    ], Company.prototype, "openDate", void 0);
    __decorate([
        typeorm_1.Column({ name: "end_date", type: "date", default: null }),
        class_validator_1.IsDate(),
        __metadata("design:type", Date)
    ], Company.prototype, "endDate", void 0);
    __decorate([
        typeorm_1.Column({ name: "responsible_name" }),
        __metadata("design:type", String)
    ], Company.prototype, "responsibleName", void 0);
    Company = __decorate([
        typeorm_1.Entity("person_company")
    ], Company);
    return Company;
}());
exports.default = Company;
