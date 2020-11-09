import { Request, Response, NextFunction } from "express";
import { isNamedExportBindings } from "typescript";
import Task from "../models/task.model";
import { Task as TaskInterface } from "../types/Tasks/TaskTypes";

const addTask = (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		const { status, content } = taskJson;

		const task = new Task({ status, content });
		task.save();

		res.statusCode = 200;
		res.send(task.id);
	} catch (err) {
		next(err);
	}
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await Task.find({}).exec();

		res.statusCode = 200;
		res.send(tasks);
	} catch (err) {
		next(err);
	}
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		if (!taskJson.id) throw new Error("ID must be provided");

		const task = await Task.findById(taskJson.id).exec();
		if (!task) throw new Error("Task does not exist");

		task.status = taskJson.status;
		task.content = taskJson.content;
		task.save();

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		if (!taskJson.id) throw new Error("ID must be provided");

		const task = await Task.findByIdAndDelete(taskJson.id).exec();

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

export default { addTask, getTasks, updateTask, deleteTask };
