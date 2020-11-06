import { Task } from "./TaskTypes";

export interface SectionProps {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
}
