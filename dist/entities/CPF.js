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
var typeorm_1 = require("typeorm");
var Document_1 = __importDefault(require("./Document"));
var DocumentType_1 = __importDefault(require("./DocumentType"));
var CPFDocumentType = /** @class */ (function (_super) {
    __extends(CPFDocumentType, _super);
    function CPFDocumentType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CPFDocumentType;
}(DocumentType_1.default));
var CPF = /** @class */ (function (_super) {
    __extends(CPF, _super);
    function CPF() {
        var _this = 
        //super();
        _super.call(this, new CPFDocumentType()) || this;
        _this.isMain = true;
        return _this;
    }
    CPF.prototype.setType = function (type) {
        throw new Error("Method not implemented.");
    };
    __decorate([
        typeorm_1.Column({ length: 11 }),
        __metadata("design:type", String)
    ], CPF.prototype, "number", void 0);
    __decorate([
        typeorm_1.Column({ name: "is_main" }),
        __metadata("design:type", Boolean)
    ], CPF.prototype, "isMain", void 0);
    CPF = __decorate([
        typeorm_1.Entity("person_document"),
        __metadata("design:paramtypes", [])
    ], CPF);
    return CPF;
}(Document_1.default));
exports.default = CPF;
