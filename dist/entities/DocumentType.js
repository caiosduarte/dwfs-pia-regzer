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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var DocumentType = /** @class */ (function () {
    function DocumentType() {
    }
    __decorate([
        typeorm_1.Column({ primary: true }),
        __metadata("design:type", String)
    ], DocumentType.prototype, "document_type_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], DocumentType.prototype, "initials", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], DocumentType.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ name: "person_type", enum: ["F", "J", "T"] }),
        __metadata("design:type", String)
    ], DocumentType.prototype, "personType", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], DocumentType.prototype, "mask", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_main" }),
        __metadata("design:type", Boolean)
    ], DocumentType.prototype, "isMain", void 0);
    DocumentType = __decorate([
        typeorm_1.Entity("document_type")
    ], DocumentType);
    return DocumentType;
}());
exports.default = DocumentType;
