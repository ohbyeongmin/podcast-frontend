import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { PageBackground } from "../../components/page-background";
import { getHostpodcastsQuery } from "../../__generated__/getHostpodcastsQuery";
import { Button } from "../../components/button";
import { PodcastCard } from "../../components/podcast-card";
import { v4 as uuidv4 } from "uuid";



export const HOST_PODCASTS_QUERY = gql`
	query getHostpodcastsQuery {
		getHostPodcasts {
			ok
			error
			podcasts {
				id
				title
				coverImg
				description
				updatedAt
			}
		}
	}
`;

export const HostHome = () => {
	const { data, loading } = useQuery<getHostpodcastsQuery>(HOST_PODCASTS_QUERY);
	return (
		<PageBackground>
			<div className="px-5 py-5 bg-backgroungColor  sm:py-20">
				<div className="w-full  max-w-5xl  mx-auto ">
					<Link to="/create-podcast" className="w-full flex justify-end mb-10">
						<Button
							canClick={true}
							loading={false}
							actionText={"Create Podcast"}
						></Button>
					</Link>
					<div className="grid grid-cols-12 gap-3 sm:gap-4 ">
						{!loading &&
							data?.getHostPodcasts.podcasts?.map((podcast, i) => {
								return (
									<PodcastCard
										key={uuidv4()}
										routeUrl={`dashboard/${podcast.id}`}
										img={podcast.coverImg!}
										title={podcast.title}
										description={podcast.description}
										updatedAt={podcast.updatedAt}
									/>
								);
							})}
					</div>
					{data?.getHostPodcasts.podcasts?.length === 0 && (
						<div>Podcast is not exist. Create your own podcast.</div>
					)}
				</div>
			</div>
		</PageBackground>
	);
};
