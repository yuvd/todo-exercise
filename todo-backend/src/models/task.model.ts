import { Task } from "../../types/tasks/TaskTypes";
import { model, Schema } from "mongoose";

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

export default model<Task>("Task", taskSchema);
