"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var PersonDocument_1 = __importDefault(require("../entities/PersonDocument"));
var DocumentsRepository = (function () {
    function DocumentsRepository(repository) {
        this.repository = repository;
    }
    DocumentsRepository.prototype.create = function (data) {
        throw new Error("Method not implemented.");
    };
    DocumentsRepository.prototype.deleteById = function (id) {
        throw new Error("Method not implemented.");
    };
    DocumentsRepository.prototype.findByPersonIdAndName = function (person_id, name) {
        throw new Error("Method not implemented.");
    };
    DocumentsRepository.getInstance = function () {
        if (!this.INSTANCE) {
            this.INSTANCE = new DocumentsRepository(typeorm_1.getRepository(PersonDocument_1.default));
        }
        return this.INSTANCE;
    };
    return DocumentsRepository;
}());
exports.default = DocumentsRepository;
