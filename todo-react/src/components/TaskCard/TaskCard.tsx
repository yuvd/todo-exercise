import React, {
	ChangeEvent,
	useState,
	useRef,
	useMemo,
	useCallback,
} from "react";
import { Card } from "@material-ui/core";
import "./TaskCard.css";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { SectionProps } from "../../types/SectionTypes";
import Task from "../../models/Task";
import { TASK_STATUSES } from "../../types/TaskTypes";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

function EditArea(props: Record<any, any>) {
	return <textarea {...props} className={"editArea"} rows={5} cols={25} />;
}

type Props = SectionProps & { task: Task }; // Get access to the task this card should represent, as well as the ability to modify the list of tasks

function TaskCard(props: Props) {
	const [editing, toggleEditing] = useState<boolean>(
		props.task.content ? false : true
	);

	const cardContainerRef = useRef<HTMLDivElement>(null);

	const removeTask = useCallback(async () => {
		try {
			const { task, tasks, setTasks } = props;
			await task.delete();

			const filteredTasks = tasks.filter((task) => task !== props.task);
			setTasks(filteredTasks);
		} catch (err) {
			// @TODO: UI error handling
			console.log(err);
		}
	}, [props]);

	const completeTask = async () => {
		const { task, tasks, setTasks } = props;

		task.status = TASK_STATUSES.DONE;
		await task.save();
		setTasks([...tasks]);
	};

	const uncompleteTask = useCallback(async () => {
		const { task, tasks, setTasks } = props;

		task.status = TASK_STATUSES.NOT_DONE;
		await task.save();
		setTasks([...tasks]);
	}, [props]);

	const saveTask = async (e: ChangeEvent<HTMLTextAreaElement>) => {
		try {
			const { task } = props;
			task.content = e.target.value;
			await props.task.save();
		} catch (err) {
			// @TODO: UI error handling
			console.log(err);
		}
	};

	const icon = useMemo(() => {
		if (props.task.status === TASK_STATUSES.DONE) {
			return <KeyboardReturnIcon className="icon" onClick={uncompleteTask} />;
		} else {
			return editing ? (
				<CheckIcon
					className="icon saveIcon"
					onClick={() => toggleEditing(false)}
				/>
			) : (
				<DeleteIcon className="icon deleteIcon" onClick={removeTask} />
			);
		}
	}, [props.task.status, editing, removeTask, uncompleteTask]);

	return (
		<div ref={cardContainerRef} className="cardContainer">
			<Card
				className="taskCard"
				raised
				onClick={() => {
					if (!editing && props.task.status !== TASK_STATUSES.DONE)
						completeTask();
				}}
			>
				{editing ? (
					<EditArea
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => saveTask(e)}
					/>
				) : (
					props.task.content
				)}
			</Card>
			{icon}
		</div>
	);
}

export default TaskCard;
