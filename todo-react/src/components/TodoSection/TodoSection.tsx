import React from "react";
import "./TodoSection.css";
import TaskCard from "../TaskCard/TaskCard";
import AddIcon from "@material-ui/icons/Add";
import { SectionProps } from "../../types/SectionTypes";

function TodoSection(props: SectionProps) {
	const { todoCards, setTodoCards, setDoneCards } = props;

	const addCard = () => {
		setTodoCards([...todoCards, <TaskCard />]);
	};

	return (
		<div className="categoryContainer">
			<h1>To-Do</h1>
			{todoCards}
			<AddIcon id="addCardIcon" onClick={addCard} />
		</div>
	);
}

export default TodoSection;
