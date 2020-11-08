import { TASK_STATUSES } from "../types/TaskTypes";

export default class Task {
	status: keyof typeof TASK_STATUSES;
	content: string;

	constructor(status: keyof typeof TASK_STATUSES, content: string) {
		this.status = status;
		this.content = content;
	}
}
