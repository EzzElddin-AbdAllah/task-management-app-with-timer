import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
	username: string;
	password: string;
	setError: (error: string) => void;
}

const useRegisterMutation = ({ setError }: Props) => {
	const { push } = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { username: string; password: string }) => {
			try {
				const response = await axios.post(
					"http://localhost:8000/auth/register",
					{
						username: data.username,
						password: data.password,
					}
				);

				if (response.status !== 200 || !response.data) {
					setError("Username is already registered");
				}

				const { token } = response.data;

				Cookies.set("token", token, { expires: 1 });

				push("/");
			} catch (error: any) {
				setError(error.response.data.error || "Registration failed");
			}
		},

		onError: () => setError("Registration failed"),

		onSuccess: () => {
			queryClient.invalidateQueries(["tasks"]);
		},
	});
};

export default useRegisterMutation;
