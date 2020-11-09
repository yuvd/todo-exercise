"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../models/task.model"));
const addTask = (req, res, next) => {
    try {
        const taskJson = req.body;
        const { status, content } = taskJson;
        const task = new task_model_1.default({ status, content });
        task.save();
        res.statusCode = 200;
        res.send(task.id);
    }
    catch (err) {
        next(err);
    }
};
const getTasks = async (req, res, next) => {
    try {
        const tasks = await task_model_1.default.find({}).exec();
        res.statusCode = 200;
        res.send(tasks);
    }
    catch (err) {
        next(err);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const taskJson = req.body;
        if (!taskJson.id)
            throw new Error("ID must be provided");
        const task = await task_model_1.default.findById(taskJson.id).exec();
        if (!task)
            throw new Error("Task does not exist");
        task.status = taskJson.status;
        task.content = taskJson.content;
        task.save();
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
const deleteTask = async (req, res, next) => {
    try {
        const taskJson = req.body;
        if (!taskJson.id)
            throw new Error("ID must be provided");
        const task = await task_model_1.default.findByIdAndDelete(taskJson.id).exec();
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
exports.default = { addTask, getTasks, updateTask, deleteTask };
