import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Task } from "../components/TaskList";

interface TaskQueryResponse {
	tasks: Array<Task>;
	totalCount: number;
}

const useTaskQuery = (currentPage: number, searchTerm: string) => {
	return useQuery<TaskQueryResponse>({
		queryKey: ["tasks", currentPage, searchTerm],
		queryFn: async () => {
			try {
				const token = Cookies.get("token");
				const response = await axios.get(
					`http://localhost:8000/tasks?page=${currentPage}&searchTerm=${searchTerm}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return response.data;
			} catch (error) {
				throw new Error("Error fetching tasks");
			}
		},
	});
};

export default useTaskQuery;
