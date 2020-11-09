export enum TASK_STATUSES {
	"NOT_DONE" = "NOT_DONE",
	"DONE" = "DONE",
}

export interface Task {
	id?: string;
	status: keyof typeof TASK_STATUSES;
	content: string;
}
