import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
	getEpisodesQuery,
	getEpisodesQueryVariables,
} from "../../../__generated__/getEpisodesQuery";

type TypeParams = {
	id: string;
};

export const GET_EPISODES_QUERY = gql`
	query getEpisodesQuery($input: PodcastSearchInput!) {
		getEpisodes(input: $input) {
			episodes {
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

	useEffect(() => {
		const userBoardHandler = (e: MouseEvent) => {
			const target = e.target! as HTMLElement;
			const userBoard = document.querySelector("#pop-episode-option");

			if (
				target.id === "icon" ||
				target.parentElement?.id === "icon" ||
				target.parentElement?.parentElement?.id === "icon"
			) {
				userBoard?.classList.remove("hidden");
			} else {
				userBoard?.classList.add("hidden");
			}
		};

		document.addEventListener("click", userBoardHandler);

		return () => {
			document.removeEventListener("click", userBoardHandler);
		};
	}, []);

	return (
		<>
			<div className=" grid grid-cols-8 gap-5 pt-5 sm:gap-10  sm:pt-10">
				{!loading &&
					data?.getEpisodes.episodes?.map((episode) => {
						return (
							<div
								key={uuidv4()}
								className="w-full py-6 px-8 bg-trueGray-800 shadow-lg rounded-lg col-span-8 sm:col-span-4"
							>
								<div>
									<div className="mb-5 flex items-center justify-between">
										<h2 className="text-3xl font-semibold">{episode.title}</h2>
										<div className="relative">
											<div className="cursor-pointer z-10" id={"icon"}>
												<FontAwesomeIcon icon={faEllipsisV} className="z-0" />
											</div>
											<div
												id="pop-episode-option"
												className="absolute w-40 origin-top-right right-0 top-5 bg-white py-2 rounded-lg z-20 hidden"
											>
												<div className="flex flex-col">
													<Link
														to="#"
														className="p-2 transition-colors duration-300 ease-in-out text-warmGray-700  hover:bg-black hover:bg-opacity-30 hover:text-warmGray-100"
													>
														Edit Episode
													</Link>
													<button className="p-2 flex focus:outline-none transition-colors duration-300 ease-in-out bg-red-600  text-white hover:bg-opacity-30 hover:text-warmGray-100">
														DELETE
													</button>
												</div>
											</div>
										</div>
									</div>
									<audio controls src={episode.audioUrl}></audio>
								</div>
							</div>
						);
					})}
			</div>
			{data?.getEpisodes.episodes?.length === 0 && (
				<span>Uploads Episode...</span>
			)}
		</>
	);
};
