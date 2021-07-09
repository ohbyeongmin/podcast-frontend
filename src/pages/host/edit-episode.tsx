import React from "react";
import { PageBackground } from "../../components/page-background";
import { Helmet } from "react-helmet-async";
import { Button } from "../../components/button";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import {
	editEpisodeMutationVariables,
	editEpisodeMutation,
} from "../../__generated__/editEpisodeMutation";

type TypeForm = {
	title: string;
};

type TypeParams = {
	podcastId: string;
	episodeId: string;
};

const EDIT_EPISODE_MUTATION = gql`
	mutation editEpisodeMutation($input: UpdateEpisodeInput!) {
		updateEpisode(input: $input) {
			ok
			error
		}
	}
`;

export const EditEpisode = () => {
	const { podcastId: pid, episodeId: eid } = useParams<TypeParams>();
	const client = useApolloClient();
	const history = useHistory();
	const {
		register,
		getValues,
		handleSubmit,
		formState: { isValid },
	} = useForm<TypeForm>({
		mode: "onChange",
	});

	const onCompleted = (data: editEpisodeMutation) => {
		const {
			updateEpisode: { ok },
		} = data;
		const { title: newTitle } = getValues();
		if (ok) {
			client.writeFragment({
				id: `Episode:${eid}`,
				fragment: gql`
					fragment EditedEpisode on Episode {
						title
					}
				`,
				data: {
					title: newTitle,
				},
			});
			history.push(`/dashboard/${pid}`);
		}
	};

	const [editEpisodeMutation, { loading }] = useMutation<
		editEpisodeMutation,
		editEpisodeMutationVariables
	>(EDIT_EPISODE_MUTATION, {
		onCompleted,
	});

	const onSubmit = () => {
		const { title } = getValues();
		editEpisodeMutation({
			variables: {
				input: {
					podcastId: +pid,
					episodeId: +eid,
					title,
				},
			},
		});
	};
	return (
		<PageBackground>
			<Helmet>
				<title>Podcast | Upload </title>
			</Helmet>
			<div className="w-full max-w-xs md:max-w-lg m-auto pt-20 flex justify-center ">
				<div className="text-center rounded-xl py-7 px-5 shadow-md border-b-8 border-black bg-trueGray-800">
					<h1 className="font-semibold text-2xl">Edit Episode</h1>
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
						<Button
							canClick={isValid}
							loading={loading}
							actionText={"Update"}
						></Button>
					</form>
				</div>
			</div>
		</PageBackground>
	);
};
