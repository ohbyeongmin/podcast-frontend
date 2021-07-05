import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import {
	getEpisodesQuery,
	getEpisodesQueryVariables,
} from "../../../__generated__/getEpisodesQuery";
import { v4 as uuidv4 } from "uuid";
import { DashboardEpisodeCard } from "../../../components/dashboard/dashboard-episode-card";

type TypeParams = {
	id: string;
};

export const GET_EPISODES_QUERY = gql`
	query getEpisodesQuery($input: PodcastSearchInput!) {
		getEpisodes(input: $input) {
			episodes {
				id
				title
				audioUrl
			}
		}
	}
`;

export const DashboardEpisodes = () => {
	const { id: podcastId } = useParams<TypeParams>();
	const { data, loading } = useQuery<
		getEpisodesQuery,
		getEpisodesQueryVariables
	>(GET_EPISODES_QUERY, {
		variables: {
			input: {
				id: +podcastId,
			},
		},
	});

	return (
		<>
			<div className=" grid grid-cols-8 gap-5 pt-5 sm:gap-10  sm:pt-10">
				{!loading &&
					data?.getEpisodes.episodes?.map((episode) => {
						return (
							<DashboardEpisodeCard
								key={uuidv4()}
								podcastId={podcastId}
								episodeId={episode.id}
								title={episode.title}
								audioUrl={episode.audioUrl}
							/>
						);
					})}
			</div>
			{data?.getEpisodes.episodes?.length === 0 && (
				<span>Uploads Episode...</span>
			)}
		</>
	);
};
