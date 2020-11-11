"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sqlUrl = "postgres://@localhost:5432/todo-db";
const sequelize = new sequelize_1.Sequelize(sqlUrl);
exports.default = sequelize;
