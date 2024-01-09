import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export interface EditedTask {
	id: string | null;
	title: string;
	status: string;
}

interface TaskModalsProps {
	showEditModal: boolean;
	showCreateModal: boolean;
	onChange: (editedTask: EditedTask) => void;
	onSaveTask: () => void;
	onUpdateTask: () => void;
	editedTask: EditedTask;
	createError: any;
	editError: any;
	onClose: () => void;
	setCreateError: (createError: string) => void;
	setEditError: (editError: string) => void;
	setShowDeleteConfirmation: (showDeleteConfirmation: boolean) => void;
	showDeleteConfirmation: boolean;
	handleDeleteConfirmation: () => void;
}

const TaskModals = ({
	showEditModal,
	showCreateModal,
	onChange,
	onSaveTask,
	onUpdateTask,
	editedTask,
	createError,
	editError,
	onClose,
	setCreateError,
	setEditError,
	setShowDeleteConfirmation,
	showDeleteConfirmation,
	handleDeleteConfirmation,
}: TaskModalsProps) => {
	const handleSave = async () => {
		onSaveTask();
		if (!createError) {
			onClose();
		}
	};

	const handleUpdate = async () => {
		onUpdateTask();
		if (!editError) {
			onClose();
		}
	};

	const handleClose = () => {
		onClose();
		setEditError("");
		setCreateError("");
	};

	return (
		<>
			{/* Create Task Modal */}
			<Modal show={showCreateModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formTaskTitle">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter task title"
								name="title"
								value={editedTask.title}
								onChange={(e) =>
									onChange({ ...editedTask, title: e.target.value })
								}
							/>
						</Form.Group>
						{createError && <p className="text-danger">{createError}</p>}
						<Form.Group controlId="formTaskStatus">
							<Form.Label>Status</Form.Label>
							<Form.Control
								as="select"
								name="status"
								value={editedTask.status}
								onChange={(e) =>
									onChange({ ...editedTask, status: e.target.value })
								}
							>
								<option value="Open">Open</option>
								<option value="Closed">Closed</option>
								<option value="In Progress">In Progress</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Task
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Edit Task Modal */}
			<Modal show={showEditModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formEditTaskTitle">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter task title"
								name="title"
								value={editedTask.title}
								onChange={(e) =>
									onChange({ ...editedTask, title: e.target.value })
								}
							/>
						</Form.Group>
						{editError && <p className="text-danger">{editError}</p>}
						<Form.Group controlId="formEditTaskStatus">
							<Form.Label>Status</Form.Label>
							<Form.Control
								as="select"
								name="status"
								value={editedTask.status}
								onChange={(e) =>
									onChange({ ...editedTask, status: e.target.value })
								}
							>
								<option value="Open">Open</option>
								<option value="Closed">Closed</option>
								<option value="In Progress">In Progress</option>
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleUpdate}>
						Update Task
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal
				show={showDeleteConfirmation}
				onHide={() => setShowDeleteConfirmation(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to delete this task?</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteConfirmation(false)}
					>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleDeleteConfirmation}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TaskModals;
