import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IPodcastCard {
	routeUrl: string;
	img: string;
	title: string;
	description: string;
	updatedAt: string;
}

export const PodcastCard: React.FC<IPodcastCard> = ({
	routeUrl,
	img,
	title,
	description,
	updatedAt,
}) => {
	return (
		<Link
			key={uuidv4()}
			to={routeUrl}
			className="max-w-md py-4 px-8  bg-trueGray-800 shadow-lg rounded-lg my-10 col-span-12 sm:col-span-6 2xl:col-span-4 hover:bg-white hover:bg-opacity-30 transition-colors duration-300 ease-in-out cursor-pointer"
		>
			<div className="flex justify-center md:justify-end -mt-16">
				<img
					className="w-20 h-20 object-cover rounded-full border-2 border-green-400"
					src={img}
					alt="img"
				/>
			</div>
			<div>
				<h2 className="text-3xl font-semibold">{title}</h2>
				<p className="mt-2 overflow-hidden">{description}</p>
			</div>
			<div className="flex justify-end mt-4">
				<span className="text-xl font-medium text-indigo-500">{updatedAt}</span>
			</div>
		</Link>
	);
};
