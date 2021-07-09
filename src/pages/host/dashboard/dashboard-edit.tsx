import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../../__generated__/globalTypes";
import { useParams, useHistory } from "react-router-dom";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { uploadAwsS3 } from "../../../utils/utils";
import { Button } from "../../../components/button";
import {
	editPodcastMutation,
	editPodcastMutationVariables,
} from "../../../__generated__/editPodcastMutation";

interface IEditPodcast {
	title: string;
	description: string;
	coverImg: string;
	category: Category;
	refetch: () => {};
}

type TypeUpdatePodcast = {
	newTitle: string;
	newDescription: string;
	newCoverImg: FileList;
	newCategory: Category;
};

type TypeParams = {
	id: string;
};

const EDIT_PODCAST_MUTATION = gql`
	mutation editPodcastMutation($input: UpdatePodcastInput!) {
		updatePodcast(input: $input) {
			ok
			error
		}
	}
`;

export const DashboardEdit: React.FC<IEditPodcast> = ({
	title,
	description,
	category,
	coverImg,
	refetch,
}) => {
	const client = useApolloClient();
	const { id: podcastId } = useParams<TypeParams>();
	const [uploading, setUploading] = useState(false);
	const [coverUrl, setCoverUrl] = useState(coverImg);
	const history = useHistory();
	const { register, getValues, handleSubmit } = useForm<TypeUpdatePodcast>({
		defaultValues: {
			newTitle: title,
			newDescription: description,
			newCategory: category,
		},
	});

	const onCompleted = async (data: editPodcastMutation) => {
		const {
			updatePodcast: { ok },
		} = data;
		if (ok) {
			setUploading(false);
			await refetch();
			const { newTitle } = getValues();
			let cacheTitle = title !== newTitle ? newTitle : title;
			let cacheCoverImg = coverImg !== coverUrl ? coverUrl : coverImg;

			client.writeFragment({
				id: `Podcast:${podcastId}`,
				fragment: gql`
					fragment EditedPodcast on Podcast {
						title
						coverImg
					}
				`,
				data: {
					title: cacheTitle,
					coverImg: cacheCoverImg,
				},
			});
		}
	};

	const [editPodcastMutation] = useMutation<
		editPodcastMutation,
		editPodcastMutationVariables
	>(EDIT_PODCAST_MUTATION, {
		onCompleted,
	});

	const onSubmit = async () => {
		try {
			const { newTitle, newDescription, newCoverImg, newCategory } =
				getValues();
			let url = coverImg;
			if (newCoverImg[0]) {
				setUploading(true);
				url = await uploadAwsS3(newCoverImg[0]);
				setCoverUrl(url);
			}
			console.log(coverUrl);

			editPodcastMutation({
				variables: {
					input: {
						id: +podcastId,
						payload: {
							title: newTitle,
							description: newDescription,
							coverImg: url,
							category: newCategory,
						},
					},
				},
			});
		} catch (e) {}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					className="text-black"
					{...register("newTitle")}
					type="text"
				></input>
				<input
					className="text-black"
					{...register("newDescription")}
					type="text"
				></input>
				<input
					{...register("newCoverImg")}
					type="file"
					accept="image/*"
				></input>
				<select className="text-black" {...register("newCategory")}>
					{Object.keys(Category).map((category, index) => (
						<option key={index}>{category}</option>
					))}
				</select>
				<Button
					canClick={true}
					loading={uploading}
					actionText={"Update Podcast"}
				></Button>
			</form>
		</div>
	);
};
