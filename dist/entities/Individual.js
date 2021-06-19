"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var CPF_1 = __importDefault(require("./CPF"));
var Enum_1 = require("./Enum");
var Person_1 = __importDefault(require("./Person"));
var Individual = /** @class */ (function (_super) {
    __extends(Individual, _super);
    function Individual() {
        return _super.call(this, Enum_1.ALL_PERSON_TYPES.FISICA) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_individual_id" }),
        __metadata("design:type", String)
    ], Individual.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Person_1.default; }, { eager: true }),
        typeorm_1.JoinColumn({
            name: "person_individual_id",
            referencedColumnName: "person_id",
        }),
        __metadata("design:type", Person_1.default)
    ], Individual.prototype, "person", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsDate(),
        __metadata("design:type", Date)
    ], Individual.prototype, "birthday", void 0);
    __decorate([
        typeorm_1.Column({ enum: Enum_1.GENDER }),
        __metadata("design:type", String)
    ], Individual.prototype, "gender", void 0);
    __decorate([
        typeorm_1.Column({
            enum: Enum_1.ETHNICITY,
        }),
        __metadata("design:type", String)
    ], Individual.prototype, "ethnicity", void 0);
    __decorate([
        typeorm_1.Column({ name: "mother_name" }),
        __metadata("design:type", String)
    ], Individual.prototype, "motherName", void 0);
    __decorate([
        typeorm_1.Column({ name: "father_name" }),
        __metadata("design:type", String)
    ], Individual.prototype, "fatherName", void 0);
    __decorate([
        typeorm_1.Column({
            name: "civil_status",
            enum: [
                "SOLTEIRO",
                "UNIÃO ESTÁVEL",
                "CASADO",
                "SEPARADO",
                "DIVORCIADO",
                "VIÚVO",
            ],
        }),
        __metadata("design:type", String)
    ], Individual.prototype, "civilStatus", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return CPF_1.default; }, function (cpf) { return cpf.person; }),
        __metadata("design:type", CPF_1.default)
    ], Individual.prototype, "cpf", void 0);
    Individual = __decorate([
        typeorm_1.Entity("person_individual"),
        __metadata("design:paramtypes", [])
    ], Individual);
    return Individual;
}(Person_1.default));
exports.default = Individual;
