import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { authTokenVar, isloggedInVar } from "../apollo";
import { FormError } from "../components/form-error";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import {
	loginMutation,
	loginMutationVariables,
} from "../__generated__/loginMutation";

interface ILoginForm {
	email: string;
	password: string;
}

const LOGIN_MUTATION = gql`
	mutation loginMutation($loginInput: LoginInput!) {
		login(input: $loginInput) {
			ok
			error
			token
		}
	}
`;

export const Login = () => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<ILoginForm>();
	const onCompleted = (data: loginMutation) => {
		const {
			login: { ok, token },
		} = data;
		if (ok && token) {
			localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
			authTokenVar(token);
			isloggedInVar(true);
		}
	};
	const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
		loginMutation,
		loginMutationVariables
	>(LOGIN_MUTATION, {
		onCompleted,
	});
	const onSubmit = () => {
		if (!loading) {
			const { email, password } = getValues();
			loginMutation({
				variables: {
					loginInput: {
						email,
						password,
					},
				},
			});
		}
	};
	return (
		<div className="h-screen  bg-red-100 flex justify-center items-center">
			<div className=" bg-white  w-full  max-w-lg text-center  rounded-xl py-10 shadow-md">
				<h1 className="font-bold text-3xl mb-8">Welcome</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 px-10">
					<input
						{...register("email", { required: "email is required" })}
						className=" bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
						type="email"
						required
						placeholder="email"
					/>
					{errors.email?.message && (
						<FormError errorMessage={errors.email?.message} />
					)}
					<input
						{...register("password", {
							required: "password is required",
							minLength: 10,
						})}
						className=" bg-gray-100 py-3 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
						type="password"
						required
						placeholder="password"
					/>
					{errors.password?.message && (
						<FormError errorMessage={errors.password?.message} />
					)}
					{errors.password?.type === "minLength" && (
						<FormError errorMessage="Password must be at least 10 chars" />
					)}
					<button className="py-3 px-4 font-bold shadow-md focus:outline-none text-white bg-green-400 rounded-lg hover:opacity-80">
						{loading ? "Loading..." : "LOGIN"}
					</button>
					{loginMutationResult?.login.error && (
						<FormError errorMessage={loginMutationResult?.login.error} />
					)}
				</form>
			</div>
		</div>
	);
};
