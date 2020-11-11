"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../models/mongoose/task.model"));
const task_model_2 = __importDefault(require("../models/sequelize/task.model"));
const uuid_1 = require("uuid");
const addTask = async (req, res, next) => {
    try {
        const taskJson = req.body;
        const { status, content } = taskJson;
        const id = uuid_1.v4(); // Use same uuidv4 for both SQL and MongoDB entries for uniformity
        await addTask_sql(id, status, content);
        await addTask_mdb(id, status, content);
        res.statusCode = 201;
        res.send(id);
    }
    catch (err) {
        next(err);
    }
};
const getTasks = async (req, res, next) => {
    try {
        const tasks = await getTasks_sql();
        res.statusCode = 200;
        res.send(tasks);
    }
    catch (err) {
        // If fetching from the SQL DB fails, try from MongoDB
        try {
            const tasks = await getTasks_mdb();
            res.statusCode = 200;
            res.send(tasks);
        }
        catch (err) {
            next(err);
        }
    }
};
const updateTask = async (req, res, next) => {
    try {
        const taskJson = req.body;
        const { _id, status, content } = taskJson;
        await updateTask_sql(_id, status, content);
        await updateTask_mdb(_id, status, content);
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
const deleteTask = async (req, res, next) => {
    try {
        const { _id } = req.body;
        await deleteTask_sql(_id);
        await deleteTask_mdb(_id);
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
// SQL DB Actions
const addTask_sql = async (id, status, content) => {
    const post = await task_model_2.default.create({ _id: id, status, content });
};
const getTasks_sql = async () => {
    return await task_model_2.default.findAll({ raw: true });
};
const updateTask_sql = async (id, status, content) => {
    const task = await task_model_2.default.findByPk(id);
    if (!task)
        throw new Error("Task does not exist");
    task.update({ content, status });
};
const deleteTask_sql = async (id) => {
    const task = await task_model_2.default.findByPk(id);
    if (!task)
        throw new Error("Task does not exist");
    await (task === null || task === void 0 ? void 0 : task.destroy());
};
// Mongoose DB Actions
const addTask_mdb = async (id, status, content) => {
    try {
        const task = new task_model_1.default({ _id: id, status, content });
        await task.save();
    }
    catch (err) {
        throw err;
    }
};
const getTasks_mdb = async () => {
    return await task_model_1.default.find({}).exec();
};
const updateTask_mdb = async (id, status, content) => {
    const task = await task_model_1.default.findById(id).exec();
    if (!task)
        throw new Error("Task does not exist");
    task.status = status;
    task.content = content;
    await task.save();
};
const deleteTask_mdb = async (id) => {
    const task = await task_model_1.default.findById(id).exec();
    if (!task)
        throw new Error("Task does not exist");
    await task.deleteOne();
};
exports.default = { addTask, getTasks, updateTask, deleteTask };
