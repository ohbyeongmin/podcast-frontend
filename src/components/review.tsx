import React from "react";

interface IReview {
	email: string;
	title: string;
	text: string;
}

export const Review: React.FC<IReview> = ({ email, title, text }) => {
	return (
		<div className="flex flex-col ">
			<div className="w-min flex items-center bg-trueGray-700 px-3 py-1 text-xs rounded-full">
				{email}
			</div>
			<h2 className="text-trueGray-500">{title}</h2>
			<p className="text-sm">{text}</p>
		</div>
	);
};
