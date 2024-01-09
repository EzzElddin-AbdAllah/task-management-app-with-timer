"use client";

import { useRouter } from "next/navigation";
import Home from "./components/Home";
import { useVerifyToken } from "./queries/useVerifyToken";

const App = () => {
	const { push } = useRouter();

	const { isError } = useVerifyToken();

	if (isError) {
		push("/login");
	}

	return <Home />;
};

export default App;
