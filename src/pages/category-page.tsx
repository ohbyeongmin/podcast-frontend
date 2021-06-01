import React from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../pages/404";

import { Category } from "../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";

interface ICategoryParams {
	category: string;
}

export const CategoryPage = () => {
	const params = useParams<ICategoryParams>();

	if (!Object.keys(Category).includes(params.category)) {
		return <NotFound />;
	}

	return (
		<div>
			<Helmet>
				<title>{`Podcast | ${params.category}`}</title>
			</Helmet>
			<h1>category {params.category}</h1>
		</div>
	);
};
