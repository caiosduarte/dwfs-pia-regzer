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
var DocumentType_1 = __importDefault(require("./DocumentType"));
var DocumentFile_1 = __importDefault(require("./DocumentFile"));
var Embedded_1 = require("./Embedded");
var Person_1 = __importDefault(require("./Person"));
var Document = /** @class */ (function () {
    function Document(type) {
        var _a;
        if (this.id) {
            this.id = uuid_1.v4();
        }
        this.type = type;
        if (!((_a = this.type) === null || _a === void 0 ? void 0 : _a.isMain)) {
            this.isMain = false;
        }
    }
    Object.defineProperty(Document.prototype, "name", {
        get: function () {
            return this.initials || this.type.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "initials", {
        get: function () {
            return this.type.initials;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Document.prototype, "numberWithMask", {
        get: function () {
            return this.number;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        typeorm_1.Column({ primary: true }),
        __metadata("design:type", String)
    ], Document.prototype, "person_document_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Person_1.default; }, function (person) { return person.documents; }),
        typeorm_1.JoinColumn({ name: "person_id", referencedColumnName: "person_id" }),
        __metadata("design:type", Person_1.default)
    ], Document.prototype, "person", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return DocumentType_1.default; }),
        typeorm_1.JoinColumn({
            name: "document_type_id",
            referencedColumnName: "document_type_id",
        }),
        __metadata("design:type", DocumentType_1.default)
    ], Document.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column({ name: "document_number" }),
        __metadata("design:type", String)
    ], Document.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column({ name: "dispatch_date", type: "date" }),
        __metadata("design:type", Date)
    ], Document.prototype, "dispatchDate", void 0);
    __decorate([
        typeorm_1.Column({ name: "issuing_agency" }),
        __metadata("design:type", String)
    ], Document.prototype, "issuingAgency", void 0);
    __decorate([
        typeorm_1.Column({ name: "person_name" }),
        __metadata("design:type", String)
    ], Document.prototype, "personName", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_main", default: false }),
        __metadata("design:type", Boolean)
    ], Document.prototype, "isMain", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return DocumentFile_1.default; }, function (file) { return file.document; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], Document.prototype, "files", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Embedded_1.CreatedTimestamp; }),
        __metadata("design:type", Embedded_1.CreatedTimestamp)
    ], Document.prototype, "createdAt", void 0);
    Document = __decorate([
        typeorm_1.Entity({ name: "person_document" }),
        __metadata("design:paramtypes", [DocumentType_1.default])
    ], Document);
    return Document;
}());
exports.default = Document;
