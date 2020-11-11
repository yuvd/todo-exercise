import { TASK_STATUSES } from "../types/TaskTypes";
import axios from "axios";

export default class Task {
	_id: string | null;
	status: keyof typeof TASK_STATUSES;
	content: string;

	constructor(
		status: keyof typeof TASK_STATUSES,
		content: string,
		_id?: string
	) {
		this._id = _id ? _id : null;
		this.status = status;
		this.content = content;
	}

	async save() {
		try {
			await axios.patch("http://localhost:8000/updateTask", this);
		} catch (err) {
			throw err;
		}
	}

	async delete() {
		try {
			await axios.delete("http://localhost:8000/deleteTask", {
				data: { _id: this._id },
			});
		} catch (err) {
			throw err;
		}
	}
}
