import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Task } from "../components/TaskList";

interface EditedTask {
	id: string | null;
	title: string;
	status: string;
}

interface Props {
	setEditError: (createError: string) => void;
}

const useUpdateTaskMutation = ({ setEditError }: Props) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (updatedTaskData: EditedTask) => {
			const token = Cookies.get("token");
			const response = await axios.patch(
				`http://localhost:8000/tasks/${updatedTaskData.id}`,
				updatedTaskData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.task;
		},

		onError: (error: any) => setEditError(error.response.data.error),

		onSuccess: (data) => {
			queryClient.setQueryData(["tasks"], (prevData: Task[] | undefined) => {
				return prevData
					? prevData.map((task: any) => (task._id === data._id ? data : task))
					: [];
			});
		},
	});
};

export default useUpdateTaskMutation;
