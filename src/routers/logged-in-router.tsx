import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { PodcastList } from "../pages/podcastList";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { CategoryPage } from "../pages/category-page";
import { PodcastDetail } from "../pages/podcastDetail";
import { CategoryNav } from "../components/category-nav";
import { Category } from "../__generated__/globalTypes";

const ListenerRoutes = [
	<Route key="1" path="/" exact>
		<PodcastList />
	</Route>,
	<Route key="2" path="/:category" exact>
		<CategoryPage />
	</Route>,
	<Route key="3" path="/podcast/:id" exact>
		<PodcastDetail />
	</Route>,
];

const categories = ["All", ...Object.values(Category)];

export const LoggedInRouter = () => {
	const { data, error, loading } = useMe();

	if (loading || !data || error) {
		return (
			<div className="h-screen flex justify-center items-center">
				<span className="text-xl font-medium tracking-wide">loading...</span>
			</div>
		);
	}

	return (
		<Router>
			<Header />
			<CategoryNav categories={categories} />
			<Switch>
				{data?.me.role === "Listener" && ListenerRoutes}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
};
