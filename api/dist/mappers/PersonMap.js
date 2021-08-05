"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = exports.PersonMapper = exports.PersonMap2 = exports.mapperWithType = exports.mapper = void 0;
var ts_transformer_keys_1 = require("ts-transformer-keys");
function getKeysAndValues(rawValues, createdKeys, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.all, all = _c === void 0 ? true : _c, _d = _b.nullify, nullify = _d === void 0 ? true : _d, _e = _b.partial, partial = _e === void 0 ? false : _e;
    var initialValue = partial ? {} : {};
    if (!rawValues)
        return initialValue;
    return createdKeys.reduce(function (obj, key) {
        var _a;
        var _b;
        var original = (_b = Object.getOwnPropertyDescriptor(rawValues, key)) === null || _b === void 0 ? void 0 : _b.value;
        var newValue = !!original || !nullify ? original : null;
        return all ? __assign(__assign({}, obj), (_a = {}, _a[key] = newValue, _a)) : obj;
    }, initialValue);
}
function mapper(rawValues, targetKeys, options) {
    var createdKeys = Object.getOwnPropertyNames(targetKeys);
    return getKeysAndValues(rawValues, createdKeys, options);
}
exports.mapper = mapper;
function mapperWithType(rawValues, options) {
    var createdKeys = Object.getOwnPropertyNames(ts_transformer_keys_1.keys());
    return getKeysAndValues(rawValues, createdKeys, options);
}
exports.mapperWithType = mapperWithType;
var PersonMap2 = (function () {
    function PersonMap2() {
    }
    PersonMap2.toDTO = function (from) {
        var example = {
            id: "",
            name: "",
            type: "",
            email: "",
            document: "",
            cellphone: "",
            isAdmin: false,
            roles: [""],
            permissions: [""],
            isConfirmed: false,
            isValid: false,
        };
        if (from instanceof Array) {
            return from.map(function (value) {
                return mapper(value, example);
            });
        }
        return mapper(from, example);
    };
    return PersonMap2;
}());
exports.PersonMap2 = PersonMap2;
var returnPersonMapped = function (_a) {
    var id = _a.id, name = _a.name, type = _a.type, email = _a.email, document = _a.document, cellphone = _a.cellphone, isAdmin = _a.isAdmin, roles = _a.roles, permissions = _a.permissions, isConfirmed = _a.isConfirmed, isValid = _a.isValid;
    return {
        id: id,
        name: name,
        type: type,
        email: email,
        document: document,
        cellphone: cellphone,
        isAdmin: isAdmin,
        roles: roles,
        permissions: permissions,
        isConfirmed: isConfirmed,
        isValid: isValid,
    };
};
var PersonMapper = (function () {
    function PersonMapper() {
    }
    PersonMapper.toDTO = function (person) {
        if (person instanceof Array) {
            return person.map(function (person) {
                return returnPersonMapped(__assign(__assign({}, person), person.user));
            });
        }
        else if (person) {
            return returnPersonMapped(__assign(__assign({}, person), person.user));
        }
    };
    return PersonMapper;
}());
exports.PersonMapper = PersonMapper;
var UserMapper = (function () {
    function UserMapper() {
    }
    UserMapper.toDTO = function (user) {
        if (user instanceof Array) {
            return user.map(function (user) {
                return returnPersonMapped(__assign(__assign({}, user), user.person));
            });
        }
        else if (user) {
            return returnPersonMapped(__assign(__assign({}, user), user.person));
        }
    };
    return UserMapper;
}());
exports.UserMapper = UserMapper;
