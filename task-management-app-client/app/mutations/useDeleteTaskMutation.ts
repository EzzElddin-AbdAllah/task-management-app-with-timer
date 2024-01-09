import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDeleteTaskMutation = () => {
	const queryClient = useQueryClient();

	return useMutation(
		async (taskId: string) => {
			const token = Cookies.get("token");
			await axios.delete(`http://localhost:8000/tasks/${taskId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tasks"]);
			},
		}
	);
};

export default useDeleteTaskMutation;
