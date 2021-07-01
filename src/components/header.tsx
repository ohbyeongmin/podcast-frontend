import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import podcastLogo from "../images/logo.svg";
import { Avatar } from "./avatar";
import { authTokenVar, isloggedInVar } from "../apollo";
import { LOCAL_STORAGE_TOKEN } from "../constants";

const logoutHandler = () => {
	isloggedInVar(false);
	localStorage.removeItem(LOCAL_STORAGE_TOKEN);
	authTokenVar(null);
	window.location.href = "/";
};

export const Header: React.FC = () => {
	useEffect(() => {
		const userBoardHandler = (e: MouseEvent) => {
			const target = e.target! as HTMLElement;
			const userBoard = document.querySelector("#pop-user-board");
			if (target.id === "avatar") {
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
		<div className="w-full bg-backgroungColor px-2 pt-2">
			<div className=" max-w-screen-xl mx-auto flex justify-between items-center">
				<Link to="/">
					<div className="flex items-center w-68 py-1 z-10">
						<img
							className="w-12 sm:w-16 mr-2"
							src={podcastLogo}
							alt="podcast"
						/>
						<h2 className="text-4xl sm:text-6xl font-semibold text-coolGray-100">
							Podcast
						</h2>
					</div>
				</Link>
				<div className="relative flex items-center">
					<Avatar />
					<div
						id="pop-user-board"
						className="absolute w-40 origin-top-right right-0 top-11 bg-white py-2 rounded-lg z-20 hidden"
					>
						<div className="flex flex-col">
							<Link
								to="/edit-profile"
								className="p-2 transition-colors duration-300 ease-in-out text-warmGray-700  hover:bg-black hover:bg-opacity-30 hover:text-warmGray-100"
							>
								Edit Profile
							</Link>
							<Link
								to="/"
								onClick={logoutHandler}
								className="p-2 transition-colors duration-300 ease-in-out  text-warmGray-700 hover:bg-black hover:bg-opacity-30 hover:text-warmGray-100"
							>
								logout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
