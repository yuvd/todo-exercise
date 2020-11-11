import { Request, Response, NextFunction } from "express";
import { isNamedExportBindings } from "typescript";
import Task from "../models/task.model";
import { Task as TaskInterface, TASK_STATUSES } from "../types/Tasks/TaskTypes";

const addTask = (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		const { status, content } = taskJson;
		validateTask(status, content);

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
		validateTask(taskJson.status, taskJson.content);
		if (!taskJson._id) throw new Error("ID must be provided");

		const task = await Task.findById(taskJson._id).exec();
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
		const { _id } = req.body;
		if (!_id) throw new Error("ID must be provided");

		const task = await Task.findByIdAndDelete(_id).exec();

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

// Helpers
const validateTask = (status: any, content: any) => {
	if (!(status in TASK_STATUSES) || typeof content !== "string")
		throw new Error("Invalid task.");
};

export default { addTask, getTasks, updateTask, deleteTask };
