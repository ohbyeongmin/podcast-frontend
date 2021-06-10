import React from "react";
import defaultAvatar from "../images/user.png";
// import { Link } from "react-router-dom";
// import { useMe } from "../hooks/useMe";

type TypeAvatar = {
	size?: string;
};

export const Avatar: React.FC<TypeAvatar> = ({ size = "10" }) => {
	// const { data } = useMe();

	return (
		// <Link to={data?.me.id === userId ? "/profile" : `/profile/${userId}`}>
		<div
			id="avatar"
			className={`w-${size} h-${size} bg-white bg-opacity-90 bg-cover bg-no-repeat rounded-full border-2 border-black cursor-pointer`}
			style={{ backgroundImage: `url(${defaultAvatar})` }}
		></div>
		// </Link>
	);
};
