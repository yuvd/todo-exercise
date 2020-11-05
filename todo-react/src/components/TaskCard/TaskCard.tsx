import React, { ChangeEvent, useState } from "react";
import { Card } from "@material-ui/core";
import "./TaskCard.css";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";

function EditArea(props: Record<any, any>) {
	return <textarea {...props} className={"editArea"} rows={5} cols={25} />;
}

interface Props {
	[prop: string]: any;
}

function TaskCard(props: Props) {
	const [editing, toggleEditing] = useState<boolean>(true);
	const [cardContent, setCardContent] = useState<string>();

	return (
		<div className="cardContainer">
			<Card className="taskCard" raised {...props}>
				{editing ? (
					<EditArea
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
							setCardContent(e.target.value)
						}
					/>
				) : (
					cardContent
				)}
			</Card>
			{editing ? (
				<CheckIcon
					className="icon saveIcon"
					onClick={() => toggleEditing(false)}
				/>
			) : (
				<DeleteIcon className="icon deleteIcon" />
			)}
		</div>
	);
}

export default TaskCard;
