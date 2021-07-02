import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { PodcastList } from "../pages/listener/podcast-list";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { CategoryPage } from "../pages/listener/category-page";
import { PodcastDetail } from "../pages/listener/podcast-detail";
import { CategoryNav } from "../components/category-nav";
import { Category } from "../__generated__/globalTypes";
import { UserProfile } from "../pages/me-profile";
import { HostHome } from "../pages/host/host-home";
import { CreatePodcast } from "../pages/host/create-podcast";
import { Dashboard } from "../pages/host/dashboard";

const listenerCategories = ["All", ...Object.values(Category)];

const ListenerRoutes = [
	<Route key="1" path="/" exact>
		<PodcastList />
	</Route>,
	<Route key="2" path="/category/:category" exact>
		<CategoryPage />
	</Route>,
	<Route key="3" path="/podcast/:id" exact>
		<PodcastDetail />
	</Route>,
];

const HostRoutes = [
	<Route key="1" path="/" exact>
		<HostHome />
	</Route>,
	<Route key="2" path="/create-podcast">
		<CreatePodcast />
	</Route>,
	<Route key="3" path="/dashboard/:id">
		<Dashboard />
	</Route>,
];

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
			{data?.me.role === "Listener" && (
				<CategoryNav categories={listenerCategories} />
			)}
			<Switch>
				{data?.me.role === "Listener" ? ListenerRoutes : HostRoutes}
				<Route path="/edit-profile" exact>
					<UserProfile />
				</Route>
				<Route path="/profile/:id">
					<UserProfile />
				</Route>
				<Route path="/404">
					<NotFound />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
};
