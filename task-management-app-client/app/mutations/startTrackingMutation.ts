import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const startTracking = async (taskId: string) => {
	const token = Cookies.get("token");
	const response = await axios.post(
		`http://localhost:8000/tasks/${taskId}/start-tracking`,
		null,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return response.data.task;
};

const useStartTrackingMutation = () => {
	const queryClient = useQueryClient();

	return useMutation((taskId: string) => startTracking(taskId), {
		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});
};

export default useStartTrackingMutation;
