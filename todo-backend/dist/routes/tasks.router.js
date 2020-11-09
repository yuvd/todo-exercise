"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
router.post("/addTask", task_controller_1.default.addTask);
router.get("/getTasks", task_controller_1.default.getTasks);
router.patch("/updateTask", task_controller_1.default.updateTask);
router.delete("/deleteTask", task_controller_1.default.deleteTask);
exports.default = router;
