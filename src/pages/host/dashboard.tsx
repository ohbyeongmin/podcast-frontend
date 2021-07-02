import React, { useEffect } from "react";
import { Button } from "../../components/button";
import { Link, useHistory, useParams } from "react-router-dom";
import { PageBackground } from "../../components/page-background";
import { Helmet } from "react-helmet";
import { gql, useQuery } from "@apollo/client";
import {
	getHostPodcastQuery,
	getHostPodcastQueryVariables,
} from "../../__generated__/getHostPodcastQuery";
import { useMe } from "../../hooks/useMe";

//https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3

type paramsType = {
	id: string;
};

const GET_HOST_PODCAST_QUERY = gql`
	query getHostPodcastQuery($input: PodcastSearchInput!) {
		getPodcast(input: $input) {
			error
			ok
			podcast {
				id
				createdAt
				updatedAt
				title
				category
				rating
				description
				coverImg
				creator {
					id
				}
				episodes {
					id
					title
					audioUrl
				}
				reviews {
					id
					createdAt
					updatedAt
					title
					text
					creator {
						avatarUrl
						email
					}
				}
			}
		}
	}
`;

export const Dashboard = () => {
	const history = useHistory();
	const { data: meData, loading: meLoading } = useMe();
	const { id: podcastId } = useParams<paramsType>();
	const { data: podcastData, loading: podcastLoading } = useQuery<
		getHostPodcastQuery,
		getHostPodcastQueryVariables
	>(GET_HOST_PODCAST_QUERY, {
		variables: {
			input: {
				id: +podcastId,
			},
		},
	});

	useEffect(() => {
		if (!meLoading && !podcastLoading) {
			if (meData?.me.id !== podcastData?.getPodcast.podcast?.creator.id) {
				history.push("/404");
			}
		}
	}, [meLoading, podcastLoading]);

	return (
		<PageBackground>
			<Helmet>
				<title>Podcast | Dashboard</title>
			</Helmet>
			<div className="px-5 py-5 bg-backgroungColor sm:py-20">
				<div className="w-full  max-w-5xl  mx-auto ">
					<Link to="/create-episode" className="w-full flex justify-end mb-5">
						<Button
							canClick={true}
							loading={false}
							actionText={"Create Episode"}
						></Button>
					</Link>
				</div>
			</div>
		</PageBackground>
	);
};
