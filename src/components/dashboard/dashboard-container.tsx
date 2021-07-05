/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button } from "../button";
import { PageBackground } from "../page-background";
import { DashboardNav } from "./dashboard-nav";

type TypeParams = {
	id: string;
};

type TypePodcastInfo = {
	title: string;
	description: string;
	coverImg: string;
};

export const DashboardContainer: React.FC<TypePodcastInfo> = ({
	children,
	title,
	description,
	coverImg,
}) => {
	const { id } = useParams<TypeParams>();

	return (
		<PageBackground>
			<Helmet>
				<title>Podcast | Dashboard</title>
			</Helmet>
			<div className="px-5 py-5 bg-backgroungColor sm:py-10">
				<div className="w-full  max-w-5xl  mx-auto ">
					<div className="w-full flex justify-between mb-5">
						<div className="flex justify-center md:justify-end">
							<img
								className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full border-2 border-green-400"
								src={coverImg}
							/>
							<div className="ml-5">
								<h1 className="text-sm md:text-3xl font-semibol">{title}</h1>
								{/* rating */}
							</div>
						</div>

						<Link to={`/upload-episode/${id}`} className="">
							<Button
								canClick={true}
								loading={false}
								actionText={"Upload Episode"}
							/>
						</Link>
					</div>
					<DashboardNav />
					{children}
				</div>
			</div>
		</PageBackground>
	);
};
