import React from "react";
import { useMe } from "../hooks/useMe";
import { Link } from "react-router-dom";
import podcastLogo from "../images/logo.svg";

export const Header: React.FC = () => {
	const { data } = useMe();

	return (
		<div className="w-full bg-red-400  bg-opacity-20 px-2">
			<div className=" max-w-screen-xl mx-auto flex justify-between items-center ">
				<Link to="/">
					<div className="flex items-center w-68 py-1">
						<img className="w-16 mr-2" src={podcastLogo} alt="podcast" />
						<h2 className="text-6xl font-semibold text-red-400">Podcast</h2>
					</div>
				</Link>
				<h3 className="text-red-400 text-sm font-semibold">{data?.me.email}</h3>
			</div>
		</div>
	);
};
