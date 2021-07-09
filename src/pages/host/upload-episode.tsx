import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { PageBackground } from "../../components/page-background";
import { uploadAwsS3 } from "../../utils/utils";
import {
	uploadEpisodeMutation,
	uploadEpisodeMutationVariables,
} from "../../__generated__/uploadEpisodeMutation";
import { GET_EPISODES_QUERY } from "./dashboard/dashboard-episodes";

type TypeParam = {
	id: string;
};

type TypeForm = {
	title: string;
	audio: FileList;
};

const UPLOAD_EPISODE_MUTATUIN = gql`
	mutation uploadEpisodeMutation($input: CreateEpisodeInput!) {
		createEpisode(input: $input) {
			ok
			id
			error
		}
	}
`;

export const UploadEpisode = () => {
	const client = useApolloClient();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm<TypeForm>({
		mode: "onChange",
	});
	const history = useHistory();
	const [audio, setAudio] = useState("");
	const [uploading, setUploading] = useState(false);
	const { id: podcastId } = useParams<TypeParam>();

	const onCompleted = (data: uploadEpisodeMutation) => {
		const {
			createEpisode: { ok },
		} = data;
		const { title } = getValues();
		if (ok) {
			setUploading(false);
			const queryResult = client.readQuery({
				query: GET_EPISODES_QUERY,
				variables: {
					input: {
						id: +podcastId,
					},
				},
			});

			client.writeQuery({
				query: GET_EPISODES_QUERY,
				data: {
					getEpisodes: {
						...queryResult.getEpisodes,
						episodes: [
							...queryResult.getEpisodes.episodes,
							{
								audioUrl: audio,
								title,
								__typename: "Episode",
							},
						],
					},
				},
				variables: {
					input: {
						id: +podcastId,
					},
				},
			});
			history.push(`/dashboard/${podcastId}`);
		}
	};

	const [uploadeEpisodeMutation, { data: uploadEpisodeResult }] = useMutation<
		uploadEpisodeMutation,
		uploadEpisodeMutationVariables
	>(UPLOAD_EPISODE_MUTATUIN, { onCompleted });

	const onSubmit = async () => {
		try {
			const { title, audio } = getValues();
			setUploading(true);
			const url = await uploadAwsS3(audio[0]);
			setAudio(url);
			uploadeEpisodeMutation({
				variables: {
					input: {
						title,
						audioUrl: url,
						podcastId: +podcastId,
					},
				},
			});
		} catch (e) {}
	};

	return (
		<PageBackground>
			<Helmet>
				<title>Podcast | Upload</title>
			</Helmet>
			<div className="w-full max-w-xs md:max-w-lg m-auto pt-20 flex justify-center ">
				<div className="text-center rounded-xl py-7 px-5 shadow-md border-b-8 border-black bg-trueGray-800">
					<h1 className="font-semibold text-2xl">Upload Episode</h1>
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
							<label>Audio File</label>
							<input
								{...register("audio", { required: true })}
								type="file"
								accept="audio/*"
							></input>
						</div>
						<Button
							canClick={isValid}
							loading={uploading}
							actionText={"Create"}
						></Button>
						{uploadEpisodeResult?.createEpisode.error && (
							<FormError
								errorMessage={uploadEpisodeResult.createEpisode.error}
							/>
						)}
					</form>
				</div>
			</div>
		</PageBackground>
	);
};
