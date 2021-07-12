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
import { Dashboard } from "../pages/host/dashboard/dashboard";
import { UploadEpisode } from "../pages/host/upload-episode";
import { EditEpisode } from "../pages/host/edit-episode";
import { v4 as uuidv4 } from "uuid";
import { Search } from "../pages/listener/search";

const listenerCategories = ["All", ...Object.values(Category)];

const ListenerRoutes = [
    <Route key={uuidv4()} path="/" exact>
        <PodcastList />
    </Route>,
    <Route key={uuidv4()} path="/:category" exact>
        <CategoryPage />
    </Route>,
    <Route key={uuidv4()} path="/podcast/:id" exact>
        <PodcastDetail />
    </Route>,
    <Route key={uuidv4()} path="/search/:search" exact>
        <Search />
    </Route>,
];

const HostRoutes = [
    <Route key={uuidv4()} path="/" exact>
        <HostHome />
    </Route>,
    <Route key={uuidv4()} path="/create-podcast">
        <CreatePodcast />
    </Route>,
    <Route key={uuidv4()} path="/dashboard/:id">
        <Dashboard />
    </Route>,
    <Route key={uuidv4()} path="/upload-episode/:id">
        <UploadEpisode />
    </Route>,
    <Route key={uuidv4()} path="/edit-episode/:podcastId/:episodeId">
        <EditEpisode />
    </Route>,
];

export const LoggedInRouter = () => {
    const { data, error, loading } = useMe();

    if (loading || !data || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="text-xl font-medium tracking-wide">
                    loading...
                </span>
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
                <Route path="/edit-profile" exact>
                    <UserProfile />
                </Route>
                {data?.me.role === "Listener" ? ListenerRoutes : HostRoutes}
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
