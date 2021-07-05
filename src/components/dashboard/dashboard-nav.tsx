import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

// epsodes, reviews, subscriptions, edited(modify, delete)

type TypeNav = {
	item: string;
	active: string;
	route: string;
};

const DashBoardItem: React.FC<TypeNav> = ({ item, active, route }) => {
	return (
		<div
			className={`p-3 md:px-10 md:py-5 md:text-xl ${
				active === route ? "" : "opacity-20"
			}   bg-trueGray-800 text-sm text-red-400 transition-opacity`}
		>
			{item}
		</div>
	);
};

export const DashboardNav: React.FC = () => {
	const { url: urlString } = useRouteMatch();
	const urlArr = urlString.split("/");
	const url =
		urlArr.length > 3
			? urlArr.slice(0, urlArr.length - 1).join("/")
			: urlArr.join("/");
	const current = urlArr.length > 3 ? urlArr[urlArr.length - 1] : "/";

	return (
		<div className=" grid grid-cols-4 text-center">
			<Link to={`${url}`}>
				<DashBoardItem item={"episodes"} active={current} route={"/"} />
			</Link>
			<Link to={`${url}/reviews`}>
				<DashBoardItem item={"reviews"} active={current} route={"reviews"} />
			</Link>
			<Link to={`${url}/listeners`}>
				<DashBoardItem
					item={"listeners"}
					active={current}
					route={"listeners"}
				/>
			</Link>
			<Link to={`${url}/edit`}>
				<DashBoardItem item={"edit"} active={current} route={"edit"} />
			</Link>
		</div>
	);
};
