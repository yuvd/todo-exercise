import { Task } from "../types/Tasks/TaskTypes";
import { model, Schema, Document } from "mongoose";

export const taskSchema: Schema = new Schema(
	{
		status: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<Task & Document>("Task", taskSchema);
