import { useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import useCreateTaskMutation from "../mutations/useCreateTaskMutation";
import useDeleteTaskMutation from "../mutations/useDeleteTaskMutation";
import useUpdateTaskMutation from "../mutations/useUpdateTaskMutation";
import useTaskQuery from "../queries/useTaskQuery";
import TaskList, { Task } from "./TaskList";
import TaskModals, { EditedTask } from "./TaskModals";
import TaskPagination from "./TaskPagination";
import useStartTrackingMutation from "../mutations/startTrackingMutation";

interface JwtPayload {
	username: string;
}

const Home = () => {
	const { push } = useRouter();
	const queryClient = useQueryClient();
	const [previousData, setPreviousData] = useState<Task[] | undefined>(
		undefined
	);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [editedTask, setEditedTask] = useState<EditedTask>({
		id: null,
		title: "",
		status: "",
	});
	const [createError, setCreateError] = useState<string>("");
	const [editError, setEditError] = useState<string>("");
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] =
		useState<boolean>(false);
	const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

	const createTaskMutation = useCreateTaskMutation({
		setCreateError: (error) => setCreateError(error),
	});

	const updateTaskMutation = useUpdateTaskMutation({
		setEditError: (error) => setEditError(error),
	});

	const deleteTaskMutation = useDeleteTaskMutation();

	const startTrackingMutation = useStartTrackingMutation();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize = 8;

	const { data, isLoading, isError } = useTaskQuery(currentPage, searchTerm);

	useEffect(() => {
		if (data && !isLoading && !isError) {
			setPreviousData(data.tasks);
		}
	}, [data, isLoading, isError]);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const handleCreateTask = () => {
		setEditedTask({
			id: null,
			title: "",
			status: "Open",
		});
		setShowCreateModal(true);
	};

	const handleSaveTask = async () => {
		try {
			await createTaskMutation.mutateAsync(editedTask);
			queryClient.invalidateQueries(["tasks"]);
			setShowCreateModal(false);
		} catch (error) {
			setShowCreateModal(true);
		}
	};

	const handleEdit = (task: Task) => {
		setEditedTask({
			id: task._id,
			title: task.title,
			status: task.status,
		});
		setShowEditModal(true);
	};

	const handleUpdateTask = async () => {
		try {
			await updateTaskMutation.mutateAsync(editedTask);
			queryClient.invalidateQueries(["tasks"]);
			setShowEditModal(false);
		} catch (error) {
			setShowEditModal(true);
		}
	};

	const handleDelete = (taskId: string) => {
		setTaskToDelete(taskId);
		setShowDeleteConfirmation(true);
	};

	const handleDeleteConfirmation = async () => {
		if (taskToDelete) {
			await deleteTaskMutation.mutateAsync(taskToDelete);
			setTaskToDelete(null);
			setShowDeleteConfirmation(false);
		}
	};

	const handleLogout = () => {
		Cookies.remove("token");
		push("/login");
	};

	const handleStartTracking = async (taskId: string) => {
		try {
			await startTrackingMutation.mutateAsync(taskId);
			queryClient.invalidateQueries(["tasks"]);
		} catch (error) {
			console.error("Error starting tracking:", error);
		}
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(1);
		setSearchTerm(e.target.value);
	};

	const handleToggleTracking = async (taskId: string) => {
		try {
			await startTrackingMutation.mutateAsync(taskId);
		} catch (error) {
			console.error("Error toggling tracking:", error);
		}
	};

	if (isError) {
		return <p>Error fetching tasks</p>;
	}

	const token = Cookies.get("token");
	const currentUser = token ? (jwtDecode(token) as JwtPayload).username : "";

	return (
		<div className="container mt-5">
			<h1>Your Tasks</h1>
			<div className="d-flex justify-content-between mb-3">
				<button className="btn btn-primary" onClick={handleCreateTask}>
					Create Task
				</button>
				<button className="btn btn-danger ms-2" onClick={handleLogout}>
					Logout
				</button>
			</div>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Search tasks by title"
					value={searchTerm}
					onChange={handleSearch}
				/>
				{searchTerm && (
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={() => setSearchTerm("")}
					>
						<BsX />
					</button>
				)}
			</div>

			<TaskList
				tasks={isLoading || isError ? previousData || [] : data?.tasks || []}
				onEdit={handleEdit}
				onDelete={handleDelete}
				currentUser={currentUser}
				onToggleTracking={handleToggleTracking}
			/>

			<TaskPagination
				currentPage={currentPage}
				totalPages={Math.ceil((data?.totalCount || 1) / pageSize)}
				onNextPage={handleNextPage}
				onPrevPage={handlePrevPage}
			/>

			<TaskModals
				showCreateModal={showCreateModal}
				showEditModal={showEditModal}
				onChange={(editedTask) => setEditedTask(editedTask)}
				onSaveTask={handleSaveTask}
				onUpdateTask={handleUpdateTask}
				editedTask={editedTask}
				createError={createError}
				editError={editError}
				onClose={() => {
					setShowCreateModal(false);
					setShowEditModal(false);
				}}
				setCreateError={(error) => setCreateError(error)}
				setEditError={(error) => setEditError(error)}
				setShowDeleteConfirmation={(showDeleteConfirmation) =>
					setShowDeleteConfirmation(showDeleteConfirmation)
				}
				handleDeleteConfirmation={handleDeleteConfirmation}
				showDeleteConfirmation={showDeleteConfirmation}
			/>
		</div>
	);
};

export default Home;
