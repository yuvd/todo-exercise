import React, { ChangeEvent, useState, useRef } from "react";
import { Card } from "@material-ui/core";
import "./TaskCard.css";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { SectionProps } from "../../types/SectionTypes";
import Task from "../../models/Task";

function EditArea(props: Record<any, any>) {
	return <textarea {...props} className={"editArea"} rows={5} cols={25} />;
}

type Props = SectionProps & { task: Task }; // Get access to the task this card should represent, as well as the ability to modify the list of tasks

function TaskCard(props: Props) {
	const [editing, toggleEditing] = useState<boolean>(true);

	const cardContainerRef = useRef<HTMLDivElement>(null);

	const removeCard = () => {
		const { tasks, setTasks } = props;

		const filteredTasks = tasks.filter((task) => task !== props.task);
		setTasks(filteredTasks);
	};

	return (
		<div ref={cardContainerRef} className="cardContainer">
			<Card className="taskCard" raised>
				{editing ? (
					<EditArea
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							(props.task.content = e.target.value)
						}
					/>
				) : (
					props.task.content
				)}
			</Card>
			{editing ? (
				<CheckIcon
					className="icon saveIcon"
					onClick={() => toggleEditing(false)}
				/>
			) : (
				<DeleteIcon className="icon deleteIcon" onClick={removeCard} />
			)}
		</div>
	);
}

export default TaskCard;
