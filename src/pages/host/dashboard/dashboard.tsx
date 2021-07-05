import React, { useEffect } from "react";
import {
	Route,
	Switch,
	useHistory,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
	getHostPodcastQuery,
	getHostPodcastQueryVariables,
} from "../../../__generated__/getHostPodcastQuery";
import { useMe } from "../../../hooks/useMe";
import { DashboardContainer } from "../../../components/dashboard/dashboard-container";
import { DashboardEpisodes } from "./dashboard-episodes";
import { DashboardReviews } from "./dashboard-reviews";
import { DashboardListeners } from "./dashboard-listeners";
import { DashboardEdit } from "./dashboard-edit";

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
				title
				description
				coverImg
				creator {
					id
				}
			}
		}
	}
`;

export const Dashboard = () => {
	const { path } = useRouteMatch();
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
	}); //, [meLoading, podcastLoading]);

	return (
		<>
			<Switch>
				<Route exact path={path}>
					<DashboardContainer
						title={podcastData?.getPodcast.podcast?.title!}
						description={podcastData?.getPodcast.podcast?.description!}
						coverImg={
							podcastData?.getPodcast.podcast?.coverImg
								? podcastData?.getPodcast.podcast?.coverImg
								: ""
						}
					>
						<DashboardEpisodes />
					</DashboardContainer>
				</Route>
				<Route path={`${path}/reviews`}>
					<DashboardContainer
						title={podcastData?.getPodcast.podcast?.title!}
						description={podcastData?.getPodcast.podcast?.description!}
						coverImg={
							podcastData?.getPodcast.podcast?.coverImg
								? podcastData?.getPodcast.podcast?.coverImg
								: ""
						}
					>
						<DashboardReviews />
					</DashboardContainer>
				</Route>
				<Route path={`${path}/listeners`}>
					<DashboardContainer
						title={podcastData?.getPodcast.podcast?.title!}
						description={podcastData?.getPodcast.podcast?.description!}
						coverImg={
							podcastData?.getPodcast.podcast?.coverImg
								? podcastData?.getPodcast.podcast?.coverImg
								: ""
						}
					>
						<DashboardListeners />
					</DashboardContainer>
				</Route>
				<Route path={`${path}/edit`}>
					<DashboardContainer
						title={podcastData?.getPodcast.podcast?.title!}
						description={podcastData?.getPodcast.podcast?.description!}
						coverImg={
							podcastData?.getPodcast.podcast?.coverImg
								? podcastData?.getPodcast.podcast?.coverImg
								: ""
						}
					>
						<DashboardEdit />
					</DashboardContainer>
				</Route>
			</Switch>
		</>
	);
};
