import React from "react";
import { gql, useQuery } from "@apollo/client";
import { podcastsQuery } from "../__generated__/podcastsQuery";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PODCASTS_QUERY = gql`
	query podcastsQuery {
		getAllPodcasts {
			ok
			error
			podcasts {
				id
				title
				category
				rating
			}
		}
	}
`;

export const PodcastList = () => {
	const { data, loading } = useQuery<podcastsQuery>(PODCASTS_QUERY);

	return (
		<div>
			<Helmet>
				<title>Podcast | All</title>
			</Helmet>
			<div className=" max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
				{!loading &&
					data?.getAllPodcasts.podcasts?.map((podcast) => (
						<Link to={`/podcast/${podcast.id}`}>
							<div className="py-4 px-8 flex flex-col justify-center bg-red-400 bg-opacity-10 cursor-pointer">
								<h2>{podcast.title}</h2>
								<div>
									<span className="mr-5">{podcast.category}</span>
									<span>{podcast.rating}</span>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};
