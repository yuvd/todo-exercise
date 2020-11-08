import Task from "../models/Task";

export interface SectionProps {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}
