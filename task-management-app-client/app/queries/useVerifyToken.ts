import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

interface VerifyTokenResponse {
	token: string;
}

export const verifyToken = async (token?: string) => {
	const response = await axios.post("http://localhost:8000/auth/verify", {
		token,
	});
	return response.data;
};

export const useVerifyToken = () => {
	return useQuery<VerifyTokenResponse>(["verifyToken"], async () => {
		const token = Cookies.get("token");

		if (!token) {
			throw new Error("Token is missing");
		}

		const verifyResponse = await verifyToken(token);

		if (verifyResponse.error) {
			throw new Error("Invalid token");
		}

		return verifyResponse;
	});
};
