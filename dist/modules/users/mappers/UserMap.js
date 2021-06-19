"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserMap = /** @class */ (function () {
    function UserMap() {
    }
    UserMap.toDTO = function (_a) {
        var id = _a.id, name = _a.name, email = _a.email, document = _a.document, isAdmin = _a.isAdmin, isConfirmed = _a.isConfirmed;
        return {
            id: id,
            name: name,
            email: email,
            document: document,
            isConfirmed: isConfirmed,
        };
    };
    return UserMap;
}());
exports.default = UserMap;
