"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IValidation = (function () {
    function IValidation() {
    }
    IValidation.prototype.validate = function (_a) {
        var analystId = _a.analystId, message = _a.message, isValid = _a.isValid, validAt = _a.validAt;
        Object.assign(this, { message: message });
    };
    return IValidation;
}());
exports.default = IValidation;
