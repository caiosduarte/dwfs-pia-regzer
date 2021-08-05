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
var Enum_1 = require("./Enum");
var Person_1 = __importDefault(require("./Person"));
var Individual = (function () {
    function Individual() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({ name: "person_individual_id" }),
        __metadata("design:type", String)
    ], Individual.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Person_1.default; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            primary: true,
        }),
        typeorm_1.JoinColumn({
            name: "person_individual_id",
            referencedColumnName: "id",
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
        typeorm_1.Column({ enum: Enum_1.ETHNICITY, default: Enum_1.ETHNICITY.NAO_DECLARADA }),
        __metadata("design:type", String)
    ], Individual.prototype, "ethnicity", void 0);
    __decorate([
        typeorm_1.Column({ name: "mother_name", nullable: true }),
        __metadata("design:type", String)
    ], Individual.prototype, "motherName", void 0);
    __decorate([
        typeorm_1.Column({ name: "father_name", nullable: true }),
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
    Individual = __decorate([
        typeorm_1.Entity("person_individual")
    ], Individual);
    return Individual;
}());
exports.default = Individual;
