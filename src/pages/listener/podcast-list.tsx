import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { PageBackground } from "../../components/page-background";
import { PodcastCardListener } from "../../components/listener/podcast-card-listener";
import { v4 as uuidv4 } from "uuid";
import { SearchBar } from "../../components/search-bar";
import { useLocation } from "react-router-dom";
import { podcastsPagenationQuery } from "../../__generated__/podcastsPagenationQuery";
import { Pagenation } from "../../components/pagenation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PODCASTS_PAGENATION_QUERY = gql`
    query podcastsPagenationQuery($input: GetPodcastsPagenationInput!) {
        getPodcastsPagenation(input: $input) {
            ok
            error
            totalPages
            totalCount
            podcasts {
                id
                title
                description
                category
                rating
                coverImg
                listeners {
                    id
                }
                reviews {
                    id
                }
            }
        }
    }
`;

export const PodcastList = () => {
    const { search, pathname } = useLocation();
    const [page, setPage] = useState(0);
    const { data, loading, refetch } = useQuery<podcastsPagenationQuery>(
        PODCASTS_PAGENATION_QUERY,
        {
            variables: {
                input: {
                    page: page,
                },
            },
        }
    );

    useEffect(() => {
        search ? setPage(+search.split("=")[1]) : setPage(1);
    }, [search, setPage]);

    return (
        <PageBackground>
            <Helmet>
                <title>Podcast | All</title>
            </Helmet>
            <div className="max-w-3xl w-full mx-auto z-10">
                <div className="flex flex-col ">
                    <SearchBar />
                    {loading ? (
                        <SkeletonTheme color="#262626" highlightColor="#333">
                            <p>
                                <Skeleton
                                    className="mt-7 mx-auto"
                                    count={3}
                                    duration={1}
                                    height={150}
                                />
                            </p>
                        </SkeletonTheme>
                    ) : (
                        data?.getPodcastsPagenation.podcasts?.map((podcast) => {
                            return (
                                <PodcastCardListener
                                    key={uuidv4()}
                                    podcast={podcast}
                                    refetch={refetch}
                                />
                            );
                        })
                    )}
                    <Pagenation
                        pathname={pathname}
                        page={page}
                        totalPages={data?.getPodcastsPagenation.totalPages!}
                    />
                </div>
            </div>
        </PageBackground>
    );
};
