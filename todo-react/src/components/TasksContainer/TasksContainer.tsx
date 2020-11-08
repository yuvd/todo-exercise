import React, { useState } from "react";
import DoneSection from "../DoneSection/DoneSection";
import TodoSection from "../TodoSection/TodoSection";
import Task from "../../models/Task";

function TasksContainer() {
	const [tasks, setTasks] = useState<Task[]>([]);

	return (
		<div id="tasksContainer">
			<TodoSection tasks={tasks} setTasks={setTasks} />
			<span id="tasksDivider" />
			<DoneSection tasks={tasks} setTasks={setTasks} />
		</div>
	);
}

export default TasksContainer;
