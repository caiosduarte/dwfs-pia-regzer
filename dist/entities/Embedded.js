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
exports.Dated = exports.CreatedTimestamp = void 0;
var typeorm_1 = require("typeorm");
var CreatedTimestamp = /** @class */ (function () {
    function CreatedTimestamp() {
    }
    __decorate([
        typeorm_1.CreateDateColumn({
            name: "created_at",
            type: "datetime",
        }),
        __metadata("design:type", Date)
    ], CreatedTimestamp.prototype, "createdAt", void 0);
    return CreatedTimestamp;
}());
exports.CreatedTimestamp = CreatedTimestamp;
var Dated = /** @class */ (function () {
    function Dated() {
    }
    __decorate([
        typeorm_1.Column(function (type) { return CreatedTimestamp; }, { prefix: false }),
        __metadata("design:type", CreatedTimestamp)
    ], Dated.prototype, "createdTimestamp", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ name: "updated_at", type: "datetime" }),
        __metadata("design:type", Date)
    ], Dated.prototype, "updatedAt", void 0);
    return Dated;
}());
exports.Dated = Dated;
