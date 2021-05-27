import React from "react";
import { isloggedInVar } from "../apollo";

export const LoggedInRouter = () => {
	const onClick = () => {
		isloggedInVar(false);
	};
	return (
		<div>
			<h1>login</h1>
			<button onClick={onClick}>log out</button>
		</div>
	);
};
