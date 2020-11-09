"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTask = async (req, res, next) => {
    try {
        const task = req.body;
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
const getTasks = async (req, res, next) => {
    try {
        const task = req.body;
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const task = req.body;
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
const deleteTask = async (req, res, next) => {
    try {
        const task = req.body;
        res.statusCode = 200;
        res.send();
    }
    catch (err) {
        next(err);
    }
};
exports.default = { addTask, getTasks, updateTask, deleteTask };
