"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var DayjsProvider = (function () {
    function DayjsProvider() {
    }
    DayjsProvider.getInstance = function () {
        if (!DayjsProvider.INSTANCE) {
            DayjsProvider.INSTANCE = new DayjsProvider();
        }
        return DayjsProvider.INSTANCE;
    };
    DayjsProvider.prototype.addDays = function (days) {
        return dayjs_1.default().add(days, "days").toDate();
    };
    DayjsProvider.prototype.addMinutes = function (minutes) {
        return dayjs_1.default().add(minutes, "minutes").toDate();
    };
    return DayjsProvider;
}());
exports.default = DayjsProvider;
