import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageBackground } from "../../components/page-background";
import { SearchBar } from "../../components/search-bar";
import { v4 as uuidv4 } from "uuid";
import { PodcastCardListener } from "../../components/listener/podcast-card-listener";
import { useLocation, useParams } from "react-router-dom";
import { searchPodcastsQuery } from "../../__generated__/searchPodcastsQuery";
import { Pagenation } from "../../components/pagenation";
import { FormError } from "../../components/form-error";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface ISearch {
    search: string;
}

const SEARCH_PODCASTS_QUERY = gql`
    query searchPodcastsQuery($input: SearchPodcastsInput!) {
        searchPodcasts(input: $input) {
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

export const Search = () => {
    const { search: searchItem } = useParams<ISearch>();
    const [page, setPage] = useState(0);
    const { search, pathname } = useLocation();
    const { data, loading, refetch } = useQuery<searchPodcastsQuery>(
        SEARCH_PODCASTS_QUERY,
        {
            variables: {
                input: {
                    page: page,
                    titleQuery: searchItem,
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
                <title>{`Podcast | ${searchItem}`}</title>
            </Helmet>
            <div className="max-w-3xl w-full mx-auto z-10">
                <div className="flex flex-col">
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
                        data?.searchPodcasts.podcasts?.map((podcast) => (
                            <PodcastCardListener
                                key={uuidv4()}
                                podcast={podcast}
                                refetch={refetch}
                            />
                        ))
                    )}
                    {data?.searchPodcasts.error && (
                        <div className="self-center my-10">
                            <FormError
                                errorMessage={data.searchPodcasts.error}
                            />
                        </div>
                    )}
                    <Pagenation
                        pathname={pathname}
                        page={page}
                        totalPages={data?.searchPodcasts.totalPages}
                    />
                </div>
            </div>
        </PageBackground>
    );
};
