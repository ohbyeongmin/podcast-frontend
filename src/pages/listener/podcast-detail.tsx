import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
	podcastQuery,
	podcastQueryVariables,
} from "../../__generated__/podcastQuery";
import { Helmet } from "react-helmet-async";

const PODCAST_QUERY = gql`
	query podcastQuery($input: PodcastSearchInput!) {
		getPodcast(input: $input) {
			ok
			error
			podcast {
				title
				category
				rating
				episodes {
					title
					category
				}
			}
		}
	}
`;

interface IParams {
	id: string;
}

export const PodcastDetail = () => {
	const params = useParams<IParams>();
	const { data, loading } = useQuery<podcastQuery, podcastQueryVariables>(
		PODCAST_QUERY,
		{
			variables: {
				input: {
					id: +params.id,
				},
			},
		}
	);

	return (
		<div className="w-full h-screen flex justify-center bg-red-400 bg-opacity-10">
			<Helmet>
				<title>{`Podcast | ${data?.getPodcast.podcast?.title}`}</title>
			</Helmet>
			{!loading && data?.getPodcast && data?.getPodcast?.podcast && (
				<div className="max-w-md w-96 mx-auto py-3 px-10 ">
					<h2 className="text-2xl py-1 font-bold">
						{data.getPodcast.podcast.title}
					</h2>
					<div className="flex justify-between text-md font-medium mb-5">
						<span>{data.getPodcast.podcast.category}</span>
						<span>{data.getPodcast.podcast.rating}</span>
					</div>
					<div className="grid grid-cols-1 bg-gray-200 bg-opacity-25 gap-2">
						{data.getPodcast.podcast.episodes?.map((episode, index) => (
							<div
								key={index}
								className="flex py-2 px-4 justify-between bg-red-200"
							>
								<h2>{episode.title}</h2>
								<span>{episode.category}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
