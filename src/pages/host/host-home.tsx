import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { PageBackground } from "../../components/page-background";
import { getHostpodcastsQuery } from "../../__generated__/getHostpodcastsQuery";
import { Button } from "../../components/button";

const HOST_PODCASTS_QUERY = gql`
	query getHostpodcastsQuery {
		getHostPodcasts {
			ok
			error
			podcasts {
				id
				title
				coverImg
				description
			}
		}
	}
`;

export const HostHome = () => {
	const { data, loading } = useQuery<getHostpodcastsQuery>(HOST_PODCASTS_QUERY);
	const arr = ["1", "2", "3", "4", "5", "6"];
	console.log(data?.getHostPodcasts.ok, loading);
	return (
		<PageBackground>
			<div className="px-5 py-5 bg-backgroungColor  sm:py-20">
				<div className="w-full  max-w-5xl  mx-auto ">
					<Link to="/create-podcast" className="w-full flex justify-end mb-5">
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
									<Link
										key={i}
										to={`podcast/${podcast.id}`}
										className="col-span-12 sm:col-span-6 2xl:col-span-4 rounded-xl border-b-8 border-black bg-trueGray-800 hover:bg-white hover:bg-opacity-30 transition-colors duration-300 ease-in-out cursor-pointer"
									>
										<div className="p-5 sm:p-8">
											<div className="grid grid-cols-2 grid-rows-2 gap-y-3">
												<div className="col-span-1 ">
													<div>
														<h3 className="font-semibold text-md sm:text-2xl">
															{podcast.title}
														</h3>
													</div>
												</div>
												<div className="col-span-1">
													<div className="flex justify-end">
														<div
															className={`w-16 h-16 sm:w-24 sm:h-24 bg-white bg-opacity-90 bg-no-repeat bg-cover rounded-md`}
															style={{
																backgroundImage: `url(${podcast.coverImg})`,
															}}
														></div>
													</div>
												</div>
												<div className="col-span-2">
													<p className=" text-xs sm:text-lg w-full h-20 overflow-hidden">
														{podcast.description}
													</p>
												</div>
											</div>
										</div>
									</Link>
								);
							})}
					</div>
				</div>
			</div>
		</PageBackground>
	);
};
