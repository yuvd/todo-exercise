"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../utils/db/sequelize/database"));
const Task = database_1.default.define("Task", {
    _id: {
        // Use same uuidv4 ID as Mongoose for uniformity
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = Task;
