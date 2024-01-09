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
	setCreateError: (createError: string) => void;
}

const useCreateTaskMutation = ({ setCreateError }: Props) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newTaskData: EditedTask) => {
			const token = Cookies.get("token");
			const response = await axios.post(
				"http://localhost:8000/tasks",
				newTaskData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data.task;
		},

		onError: (error: any) => setCreateError(error.response.data.error),

		onSuccess: (data) => {
			queryClient.setQueryData(["tasks"], (prevData: Task[] | undefined) => {
				return prevData ? [...prevData, data] : [];
			});
		},
	});
};

export default useCreateTaskMutation;
