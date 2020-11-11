import { Task } from "../../types/Tasks/TaskTypes";
import { model, Schema, Document } from "mongoose";

export const taskSchema: Schema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		content: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default model<Task & Document>("Task", taskSchema);
