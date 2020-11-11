"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("Task", exports.taskSchema);
