import React from "react";
import { gql, useQuery } from "@apollo/client";
import { podcastsQuery } from "../__generated__/podcastsQuery";
import { Helmet } from "react-helmet-async";

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
		</div>
	);
};
