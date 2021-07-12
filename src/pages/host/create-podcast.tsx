import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { PageBackground } from "../../components/page-background";
import { uploadAwsS3 } from "../../utils/utils";
import {
	createPodcastMutation,
	createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import { Category } from "../../__generated__/globalTypes";
import { HOST_PODCASTS_QUERY } from "./host-home";

type CreatePodcastType = {
	title: string;
	category: Category;
	coverImg: FileList;
	description: string;
};

export const CREATE_PODCAST_MUTATION = gql`
	mutation createPodcastMutation($createPodcastInput: CreatePodcastInput!) {
		createPodcast(input: $createPodcastInput) {
			ok
			error
			id
		}
	}
`;

export const CreatePodcast = () => {
	const client = useApolloClient();
	const [imageUrl, setImageUrl] = useState("");
	const history = useHistory();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm<CreatePodcastType>({
		mode: "onChange",
	});

	const onCompleted = (data: createPodcastMutation) => {
		const {
			createPodcast: { ok, id },
		} = data;
		const { title, description } = getValues();
		if (ok) {
			setUploading(false);
			const queryResult = client.readQuery({ query: HOST_PODCASTS_QUERY });
			client.writeQuery({
				query: HOST_PODCASTS_QUERY,
				data: {
					getHostPodcasts: {
						...queryResult.getHostPodcasts,
						podcasts: [
							...queryResult.getHostPodcasts.podcasts,
							{
								coverImg: imageUrl,
								description,
								id,
								title,
								__typename: "Podcast",
							},
						],
					},
				},
			});
			history.push("/");
		}
	};

	const [createPodcastMutation, { data: createPodcastResult }] = useMutation<
		createPodcastMutation,
		createPodcastMutationVariables
	>(CREATE_PODCAST_MUTATION, { onCompleted });
	const [uploading, setUploading] = useState(false);
	const onSubmit = async () => {
		try {
			setUploading(true);
			const { title, category, description, coverImg } = getValues();
			const url = await uploadAwsS3(coverImg[0]);
			setImageUrl(url);
			createPodcastMutation({
				variables: {
					createPodcastInput: {
						title,
						category,
						coverImg: url,
						description,
					},
				},
			});
		} catch (e) { }
	};

	return (
		<PageBackground>
			<Helmet>
				<title>Podcast | Create Podcast</title>
			</Helmet>
			<div className="w-full max-w-xs md:max-w-lg m-auto pt-20 flex justify-center ">
				<div className="text-center rounded-xl py-7 px-5 shadow-md border-b-8 border-black bg-trueGray-800">
					<h1 className="font-semibold text-2xl">Create Podcast</h1>
					<form className="grid gap-5 mb-3" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col w-full items-start">
							<label>Title</label>
							<input
								{...register("title", { required: true })}
								className="bg-gray-100 text-black w-full py-1 px-3 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
								name="title"
								type="text"
								placeholder="Title"
								required
							></input>
						</div>
						<div className="flex flex-col items-start">
							<label>Description</label>
							<textarea
								{...register("description", { required: true })}
								className="bg-gray-100 text-black w-full py-1 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
								placeholder="Description"
								required
							/>
						</div>
						<div className="flex flex-col items-start">
							<label>Cover Image</label>
							<input
								{...register("coverImg")}
								type="file"
								accept="image/*"
							></input>
						</div>
						<div className="flex flex-col items-start">
							<label>Category</label>
							<select
								{...register("category")}
								className="bg-gray-100 w-full text-black py-1 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
							>
								{Object.keys(Category).map((category, index) => (
									<option key={index}>{category}</option>
								))}
							</select>
						</div>

						<Button
							canClick={isValid}
							loading={uploading}
							actionText={"Create"}
						></Button>
						{createPodcastResult?.createPodcast.error && (
							<FormError
								errorMessage={createPodcastResult.createPodcast.error}
							/>
						)}
					</form>
				</div>
			</div>
		</PageBackground>
	);
};
