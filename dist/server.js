"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
require("reflect-metadata");
var upload_1 = __importDefault(require("./config/upload"));
var database_1 = __importDefault(require("./database"));
var AppError_1 = __importDefault(require("./errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(express_1.default.json());
app.use("/documents", express_1.default.static(upload_1.default.tmpFolder + "/documents"));
database_1.default();
app.use(cors_1.default({}));
app.use(routes_1.default);
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error: " + err.message,
    });
});
app.listen(3333, function () {
    console.log("Server running on port 3333! ✌");
});
