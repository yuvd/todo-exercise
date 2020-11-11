import React, { useState, useEffect } from "react";
import DoneSection from "../DoneSection/DoneSection";
import TodoSection from "../TodoSection/TodoSection";
import Task from "../../models/Task";
import { Task as TaskInterface } from "../../types/TaskTypes";
import axios from "axios";

function TasksContainer() {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const syncTasks = async () => {
			try {
				let syncedTasks = (await axios.get("http://localhost:8000/getTasks"))
					.data;
				syncedTasks = syncedTasks.map((task: TaskInterface) => {
					return new Task(task.status, task.content, task._id);
				});
				setTasks([...syncedTasks]);
			} catch (err) {
				// @TODO: UI error handling
				console.log(err);
			}
		};

		syncTasks();
	}, []);

	return (
		<div id="tasksContainer">
			<TodoSection tasks={tasks} setTasks={setTasks} />
			<span id="tasksDivider" />
			<DoneSection tasks={tasks} setTasks={setTasks} />
		</div>
	);
}

export default TasksContainer;
