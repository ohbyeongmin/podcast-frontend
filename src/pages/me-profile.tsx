import React from "react";
import { PageBackground } from "../components/page-background";
import { Button } from "../components/button";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useMe } from "../hooks/useMe";
import {
	editProfileMutation,
	editProfileMutationVariables,
} from "../__generated__/editProfileMutation";
import { useHistory } from "react-router-dom";

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
	const { data: userData } = useMe();
	const client = useApolloClient();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<TypeEditProfileForm>({
		mode: "onChange",
		defaultValues: {
			email: userData?.me.email,
		},
	});

	const onCompleted = (data: editProfileMutation) => {
		const {
			editProfile: { ok },
		} = data;
		if (ok && userData) {
			const {
				me: { email: prevEmail, id },
			} = userData;
			const { email: newEmail } = getValues();
			if (prevEmail !== newEmail) {
				client.writeFragment({
					id: `User:${id}`,
					fragment: gql`
						fragment EditedUser on User {
							email
						}
					`,
					data: {
						email: newEmail,
					},
				});
			}
			history.push("/");
		}
	};

	const [editProfileMutation, { data: editProfileMutationResult }] =
		useMutation<editProfileMutation, editProfileMutationVariables>(
			EDIT_PROFILE_MUTATION,
			{
				onCompleted,
			}
		);

	const onSubmit = () => {
		const { email, password } = getValues();
		editProfileMutation({
			variables: {
				editProfileInput: {
					email,
					...(password !== "" && { password }),
				},
			},
		});
	};

	return (
		<PageBackground>
			<div className="max-w-xl mx-auto flex flex-col pt-16 px-5 text-red-500">
				<div className=" rounded-2xl bg-trueGray-900 border-black border-solid border-b-4 mb-10">
					<div className="p-5">
						<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
							<div className="grid grid-cols-6 gap-y-3">
								<div className="col-span-6">
									<label className="font-bold text-lg">Email</label>
								</div>
								<input
									className="col-span-6 sm:row-span-1 sm:col-span-3 bg-trueGray-900 focus:outline-none text-white mb-5"
									{...register("email", {
										pattern:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									})}
									type="email"
								></input>
								{errors.email?.message && alert(`${errors.email?.message}`)}
								<div className="col-span-6">
									<label className="font-bold text-lg">Password</label>
								</div>
								<input
									{...register("password")}
									className="col-span-6 sm:row-span-1 sm:col-span-3 bg-trueGray-900 focus:outline-none text-white"
									type="password"
									placeholder="Password"
								></input>
							</div>
							<div className="self-end mt-5 text-xs">
								<Button
									canClick={isValid}
									loading={false}
									actionText={"Change Profile"}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
			{editProfileMutationResult?.editProfile.error &&
				alert(editProfileMutationResult.editProfile.error)}
		</PageBackground>
	);
};
