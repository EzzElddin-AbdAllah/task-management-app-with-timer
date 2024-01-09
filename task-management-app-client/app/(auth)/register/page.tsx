"use client";

import useRegisterMutation from "@/app/mutations/useRegisterMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	username: z.string().min(3).max(50),
	password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
	const [error, setError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const loginMutation = useRegisterMutation({
		username: "",
		password: "",
		setError: (error) => setError(error),
	});

	const onSubmit = async (data: FormData) => {
		loginMutation.mutate({ username: data.username, password: data.password });
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<h2>Register</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-3">
							<label htmlFor="username" className="form-label">
								Username
							</label>
							<input
								type="text"
								className={`form-control ${
									errors.username ? "is-invalid" : ""
								}`}
								{...register("username")}
							/>
							{errors.username && (
								<div className="invalid-feedback">
									{errors.username.message}
								</div>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								className={`form-control ${
									errors.password ? "is-invalid" : ""
								}`}
								{...register("password")}
							/>
							{errors.password && (
								<div className="invalid-feedback">
									{errors.password.message}
								</div>
							)}
						</div>
						<div className="mb-3 text-center">
							<button type="submit" className="btn btn-primary">
								Register
							</button>
						</div>
					</form>
					{error && <div className="text-danger text-center mb-3">{error}</div>}
					<div className="text-center">
						<p>
							Already have an account? <Link href="/login">Login here</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
