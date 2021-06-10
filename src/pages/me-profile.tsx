import React from "react";
import { PageBackground } from "../components/page-background";
import { Button } from "../components/button";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useMe } from "../hooks/useMe";
import {
	editProfileMutation,
	editProfileMutationVariables,
} from "../__generated__/editProfileMutation";

type TypeEditProfileForm = {
	email: string;
	password: string;
	avatarUrl: string;
};

const EDIT_PROFILE_MUTATION = gql`
	mutation editProfileMutation($editProfileInput: EditProfileInput!) {
		editProfile(input: $editProfileInput) {
			ok
			error
		}
	}
`;

export const UserProfile = () => {
	const { data } = useMe();
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<TypeEditProfileForm>({
		mode: "onChange",
	});

	const [editProfileMutation, { data: editProfileMutationResult, loading }] =
		useMutation<editProfileMutation, editProfileMutationVariables>(
			EDIT_PROFILE_MUTATION
		);

	const emailOnSubmit = () => {
		if (!loading) {
			const { email } = getValues();
			editProfileMutation({
				variables: {
					editProfileInput: {
						email,
					},
				},
			});
		}
	};

	const passwordOnSubmit = () => {
		if (!loading) {
			const { password } = getValues();
			editProfileMutation({
				variables: {
					editProfileInput: {
						password,
					},
				},
			});
			setValue("password", "");
		}
	};

	return (
		<PageBackground>
			<div className="max-w-xl mx-auto flex flex-col pt-16 px-5 text-red-500">
				<div className=" rounded-2xl bg-trueGray-900 border-black border-solid border-b-4 mb-10">
					<div className="p-5">
						<form
							className="flex flex-col"
							onSubmit={handleSubmit(emailOnSubmit)}
						>
							<div className="grid grid-rows-2 grid-cols-6 gap-y-3">
								<div className="col-span-6">
									<label className="font-bold text-lg">Email</label>
								</div>
								<input
									className="col-span-6 sm:row-span-1 sm:col-span-3 bg-trueGray-900 focus:outline-none text-white"
									{...register("email", {
										pattern:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									})}
									type="email"
									placeholder={data?.me.email! as string}
								></input>
							</div>
							<div className="self-end mt-5 text-xs">
								<Button
									canClick={true}
									loading={false}
									actionText={"Change email"}
								/>
							</div>
						</form>
					</div>
				</div>
				{errors.email?.message && alert(`${errors.email?.message}`)}
				<div className=" rounded-2xl bg-trueGray-900 border-black border-solid border-b-4">
					<div className="p-5">
						<form
							className="flex flex-col"
							onSubmit={handleSubmit(passwordOnSubmit)}
						>
							<div className="grid grid-rows-2 grid-cols-6 gap-y-3">
								<div className="col-span-6">
									<label className="font-bold text-lg">Password</label>
								</div>
								<input
									{...register("password")}
									className="col-span-6 sm:row-span-1 sm:col-span-3 bg-trueGray-900 focus:outline-none text-white"
									type="password"
									placeholder={"Password"}
								></input>
							</div>
							<div className="self-end mt-5 text-xs">
								<Button
									canClick={true}
									loading={loading}
									actionText={"Change email"}
								/>
							</div>
						</form>
					</div>
				</div>
				{editProfileMutationResult?.editProfile.error &&
					alert(editProfileMutationResult.editProfile.error)}
				{editProfileMutationResult?.editProfile.ok && alert("Success!")}
			</div>
		</PageBackground>
	);
};
