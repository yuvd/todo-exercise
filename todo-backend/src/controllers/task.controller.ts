import { Request, Response, NextFunction } from "express";
import { isNamedExportBindings } from "typescript";
import Task from "../models/task.model";
import { Task as TaskInterface } from "../types/Tasks/TaskTypes";

const addTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task: TaskInterface = req.body;

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task: TaskInterface = req.body;

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task: TaskInterface = req.body;

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task: TaskInterface = req.body;

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

export default { addTask, getTasks, updateTask, deleteTask };
