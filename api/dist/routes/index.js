"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authenticate_routes_1 = __importDefault(require("./authenticate.routes"));
var password_routes_1 = __importDefault(require("./password.routes"));
var people_routes_1 = __importDefault(require("./people.routes"));
var users_routes_1 = __importDefault(require("./users.routes"));
var routes = express_1.Router();
routes.use("/users", users_routes_1.default);
routes.use(authenticate_routes_1.default);
routes.use("/password", password_routes_1.default);
routes.use("/people", people_routes_1.default);
exports.default = routes;
