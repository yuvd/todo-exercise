import React, { useMemo } from "react";
import "./TodoSection.css";
import TaskCard from "../TaskCard/TaskCard";
import AddIcon from "@material-ui/icons/Add";
import { SectionProps } from "../../types/SectionTypes";
import Task from "../../models/Task";
import { TASK_STATUSES } from "../../types/TaskTypes";

function TodoSection(props: SectionProps) {
	const { tasks, setTasks } = props;

	const addTask = () => {
		// setTasks([...todoCards, <TaskCard {...props} />]);
		setTasks([...tasks, new Task(TASK_STATUSES.NOT_DONE, "")]);
	};

	const todoCards = useMemo(() => {
		const todoTasks = tasks.filter(
			(task) => task.status === TASK_STATUSES.NOT_DONE
		);
		const todoCards = todoTasks.map((task) => (
			<TaskCard {...props} task={task} />
		));
		return todoCards;
	}, [tasks, props]);

	return (
		<div className="categoryContainer">
			<h1>To-Do</h1>
			{todoCards}
			<AddIcon id="addCardIcon" onClick={addTask} />
		</div>
	);
}

export default TodoSection;
