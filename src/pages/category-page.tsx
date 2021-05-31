import React from "react";
import { useParams } from "react-router-dom";

interface ICategoryParams {
	category: string;
}

export const CategoryPage = () => {
	const params = useParams<ICategoryParams>();

	return <h1>category {params.category}</h1>;
};
