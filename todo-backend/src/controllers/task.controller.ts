import { Request, Response, NextFunction } from "express";
import { isNamedExportBindings } from "typescript";
import MongooseTask from "../models/mongoose/task.model";
import SQLTask from "../models/sequelize/task.model";
import { Task as TaskInterface, TASK_STATUSES } from "../types/Tasks/TaskTypes";
import { v4 as uuid } from "uuid";

const addTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		const { status, content } = taskJson;
		const id = uuid(); // Use same uuidv4 for both SQL and MongoDB entries for uniformity

		await addTask_sql(id, status, content);
		await addTask_mdb(id, status, content);

		res.statusCode = 201;
		res.send(id);
	} catch (err) {
		next(err);
	}
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await getTasks_sql();

		res.statusCode = 200;
		res.send(tasks);
	} catch (err) {
		// If fetching from the SQL DB fails, try from MongoDB
		try {
			const tasks = await getTasks_mdb();

			res.statusCode = 200;
			res.send(tasks);
		} catch (err) {
			next(err);
		}
	}
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const taskJson: TaskInterface = req.body;
		const { _id, status, content } = taskJson;

		await updateTask_sql(_id, status, content);
		await updateTask_mdb(_id, status, content);

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { _id } = req.body;

		await deleteTask_sql(_id);
		await deleteTask_mdb(_id);

		res.statusCode = 200;
		res.send();
	} catch (err) {
		next(err);
	}
};

// SQL DB Actions
const addTask_sql = async (id: string, status: string, content: string) => {
	const post = await SQLTask.create({ _id: id, status, content });
};

const getTasks_sql = async () => {
	return await SQLTask.findAll({ raw: true });
};

const updateTask_sql = async (
	id: string | undefined,
	status: keyof typeof TASK_STATUSES,
	content: string
) => {
	const task = await SQLTask.findByPk(id);
	if (!task) throw new Error("Task does not exist");
	task.update({ content, status });
};

const deleteTask_sql = async (id: string) => {
	const task = await SQLTask.findByPk(id);
	if (!task) throw new Error("Task does not exist");

	await task?.destroy();
};

// Mongoose DB Actions
const addTask_mdb = async (id: string, status: string, content: string) => {
	try {
		const task = new MongooseTask({ _id: id, status, content });
		await task.save();
	} catch (err) {
		throw err;
	}
};

const getTasks_mdb = async () => {
	return await MongooseTask.find({}).exec();
};

const updateTask_mdb = async (
	id: string | undefined,
	status: keyof typeof TASK_STATUSES,
	content: string
) => {
	const task = await MongooseTask.findById(id).exec();
	if (!task) throw new Error("Task does not exist");

	task.status = status;
	task.content = content;
	await task.save();
};

const deleteTask_mdb = async (id: string) => {
	const task = await MongooseTask.findById(id).exec();
	if (!task) throw new Error("Task does not exist");

	await task.deleteOne();
};

export default { addTask, getTasks, updateTask, deleteTask };
