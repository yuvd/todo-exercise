import React, { useState } from "react";
import DoneSection from "../DoneSection/DoneSection";
import TodoSection from "../TodoSection/TodoSection";

function TasksContainer() {
	// Alternative to consider: keep a list of all tasks, pass the list to both sections, and let them filter the tasks they need by "done"
	// status or some other field.
	const [todoCards, setTodoCards] = useState<JSX.Element[]>([]);
	const [doneCards, setDoneCards] = useState<JSX.Element[]>([]);

	return (
		<div id="tasksContainer">
			<TodoSection
				todoCards={todoCards}
				setTodoCards={setTodoCards}
				doneCards={doneCards}
				setDoneCards={setDoneCards}
			/>
			<span id="tasksDivider" />
			<DoneSection
				todoCards={todoCards}
				setTodoCards={setTodoCards}
				doneCards={doneCards}
				setDoneCards={setDoneCards}
			/>
		</div>
	);
}

export default TasksContainer;
