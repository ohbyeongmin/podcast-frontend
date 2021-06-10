import React from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../404";
import { Category } from "../../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { PageBackground } from "../../components/page-background";

interface ICategoryParams {
	category: string;
}

export const CategoryPage = () => {
	const params = useParams<ICategoryParams>();

	if (!Object.keys(Category).includes(params.category)) {
		return <NotFound />;
	}

	return (
		<PageBackground>
			<Helmet>
				<title>{`Podcast | ${params.category}`}</title>
			</Helmet>
			<h1>category {params.category}</h1>
		</PageBackground>
	);
};
