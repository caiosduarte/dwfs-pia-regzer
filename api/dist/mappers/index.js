"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMap = (function () {
    function UserMap() {
    }
    UserMap.toDTO = function (_a) {
        var id = _a.id, name = _a.name, email = _a.email, document = _a.document, cellphone = _a.cellphone, isAdmin = _a.isAdmin, roles = _a.roles, permissions = _a.permissions, isConfirmed = _a.isConfirmed, isValid = _a.isValid, confirmedAt = _a.confirmedAt, validatedAt = _a.validatedAt;
        return {
            id: id,
            name: name,
            email: email,
            document: document,
            cellphone: cellphone,
            isAdmin: isAdmin,
            roles: roles,
            permissions: permissions,
            isConfirmed: isConfirmed,
            isValid: isValid,
            confirmedAt: confirmedAt,
            validatedAt: validatedAt,
        };
    };
    return UserMap;
}());
exports.default = UserMap;
