import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
	deleteEpisodeMutation,
	deleteEpisodeMutationVariables,
} from "../../__generated__/deleteEpisodeMutation";
import { GET_EPISODES_QUERY } from "../../pages/host/dashboard/dashboard-episodes";
import { getEpisodesQuery } from "../../__generated__/getEpisodesQuery";

interface IDashBoardEpisodeCard {
	podcastId: string;
	episodeId: number;
	title: string;
	audioUrl: string;
}

const DELETE_EPISODE_MUTATION = gql`
	mutation deleteEpisodeMutation($input: EpisodesSearchInput!) {
		deleteEpisode(input: $input) {
			error
			ok
		}
	}
`;

export const DashboardEpisodeCard: React.FC<IDashBoardEpisodeCard> = ({
	podcastId,
	episodeId,
	title,
	audioUrl,
}) => {
	const client = useApolloClient();
	const onCompleted = (data: deleteEpisodeMutation) => {
		try {
			const {
				deleteEpisode: { ok },
			} = data;
			if (ok) {
				const queryResult = client.readQuery<getEpisodesQuery>({
					query: GET_EPISODES_QUERY,
					variables: {
						input: {
							id: +podcastId,
						},
					},
				});

				const episodesFilter = queryResult?.getEpisodes.episodes?.filter(
					(episode) => episodeId !== episode.id
				);

				client.writeQuery<getEpisodesQuery>({
					query: GET_EPISODES_QUERY,
					variables: {
						input: {
							id: +podcastId,
						},
					},
					data: {
						getEpisodes: {
							...queryResult!.getEpisodes,
							episodes: [...episodesFilter!],
						},
					},
				});
			}
		} catch (e) { }
	};

	const [deleteEpisodeMutation] = useMutation<
		deleteEpisodeMutation,
		deleteEpisodeMutationVariables
	>(DELETE_EPISODE_MUTATION, { onCompleted });

	const deleteHandler = async () => {
		try {
			deleteEpisodeMutation({
				variables: {
					input: {
						podcastId: +podcastId,
						episodeId: episodeId,
					},
				},
			});
		} catch (e) { }
	};

	const episodeOptionHandler = (e: MouseEvent) => {
		try {
			let target = e.target! as HTMLElement;
			const userBoard = document.getElementById(
				`pop-episode-option${episodeId}`
			);

			for (; target.parentNode !== document;) {
				if (target.parentNode === null) {
					break;
				}
				if (target.id === `icon${episodeId}`) {
					break;
				}
				target = target.parentNode! as HTMLElement;
			}

			if (target.id === `icon${episodeId}`) {
				userBoard?.classList.remove("hidden");
			} else {
				userBoard?.classList.add("hidden");
			}
		} catch (e) { }
	};

	useEffect(() => {
		document.addEventListener("click", episodeOptionHandler);
		return () => {
			document.removeEventListener("click", episodeOptionHandler);
		};
	});

	return (
		<div
			key={uuidv4()}
			className="w-full py-6 px-8 bg-trueGray-800 shadow-lg rounded-lg col-span-8 sm:col-span-4"
		>
			<div>
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-3xl font-semibold">{title}</h2>
					<div className="relative">
						<div
							className="cursor-pointer z-10"
							id={`icon${episodeId}`}
							data-id={episodeId}
						>
							<FontAwesomeIcon icon={faEllipsisV} className="z-0" />
						</div>
						<div
							id={`pop-episode-option${episodeId}`}
							className="absolute w-40 origin-top-right right-0 top-5 bg-white py-2 rounded-lg z-20 hidden"
						>
							<div className="flex flex-col">
								<Link
									to={`/edit-episode/${podcastId}/${episodeId}`}
									className="p-2 transition-colors duration-300 ease-in-out text-warmGray-700  hover:bg-black hover:bg-opacity-30 hover:text-warmGray-100"
								>
									Edit Episode
								</Link>
								<button
									onClick={deleteHandler}
									className="p-2 flex focus:outline-none transition-colors duration-300 ease-in-out bg-red-600  text-white hover:bg-opacity-30 hover:text-warmGray-100"
								>
									DELETE
								</button>
							</div>
						</div>
					</div>
				</div>
				<audio controls src={audioUrl}></audio>
			</div>
		</div>
	);
};
