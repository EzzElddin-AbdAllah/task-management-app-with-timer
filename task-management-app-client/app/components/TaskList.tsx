import React from "react";
import { Button } from "react-bootstrap";

export interface Task {
	_id: string;
	title: string;
	status: string;
	timeSpent: string;
	createdBy: string;
	startTime?: string;
}

interface TaskListProps {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (taskId: string) => void;
	currentUser: string;
	onToggleTracking: (taskId: string) => void;
}

const TaskList = ({
	tasks,
	onEdit,
	onDelete,
	onToggleTracking,
	currentUser,
}: TaskListProps) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Title</th>
					<th>Status</th>
					<th>Time Spent</th>
					<th>Created By</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{tasks.map((task) => (
					<tr key={task._id}>
						<td>{task.title}</td>
						<td>{task.status}</td>
						<td>{task.timeSpent}</td>
						<td>{task.createdBy}</td>
						<td>
							<Button
								className="btn btn-sm btn-primary me-1"
								onClick={() => onEdit(task)}
								disabled={task.createdBy !== currentUser}
							>
								Edit
							</Button>
							<Button
								className="btn btn-sm btn-danger me-1"
								onClick={() => onDelete(task._id)}
								disabled={task.createdBy !== currentUser}
							>
								Delete
							</Button>
							<Button
								className={`btn ${
									task.startTime ? "btn-danger" : "btn-success"
								} btn-sm`}
								onClick={() => onToggleTracking(task._id)}
								disabled={task.createdBy !== currentUser}
							>
								{task.startTime ? "Stop Tracking" : "Start Tracking"}
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TaskList;
