import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { NotFound } from "../404";
import { Category } from "../../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { PageBackground } from "../../components/page-background";
import { PodcastCardListener } from "../../components/listener/podcast-card-listener";
import { gql, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { SearchBar } from "../../components/search-bar";
import { Pagenation } from "../../components/pagenation";
import { podcastsCateogryPagenationQuery } from "../../__generated__/podcastsCateogryPagenationQuery";

interface ICategoryParams {
    category: string;
}

const PODCASTS_CATEGORY_PAGENATION_QUERY = gql`
    query podcastsCateogryPagenationQuery(
        $input: GetPodcastsCategoryPagenationInput!
    ) {
        getPodcastsCategoryPagenation(input: $input) {
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

export const CategoryPage = () => {
    const params = useParams<ICategoryParams>();
    const { search, pathname } = useLocation();
    const [page, setPage] = useState(0);
    const { data, loading, refetch } =
        useQuery<podcastsCateogryPagenationQuery>(
            PODCASTS_CATEGORY_PAGENATION_QUERY,
            {
                variables: {
                    input: {
                        page: page,
                        selectCategory: params.category,
                    },
                },
            }
        );

    useEffect(() => {
        search ? setPage(+search.split("=")[1]) : setPage(1);
    }, [search, setPage]);

    if (!Object.keys(Category).includes(params.category)) {
        return <NotFound />;
    }

    return (
        <PageBackground>
            <Helmet>
                <title>{`Podcast | ${params.category}`}</title>
            </Helmet>
            <div className="max-w-3xl w-full mx-auto z-10">
                <div className="flex flex-col">
                    <SearchBar />
                    {!loading &&
                        data?.getPodcastsCategoryPagenation.podcasts?.map(
                            (podcast) => (
                                <PodcastCardListener
                                    key={uuidv4()}
                                    podcast={podcast}
                                    refetch={refetch}
                                />
                            )
                        )}
                    <Pagenation
                        pathname={pathname}
                        page={page}
                        totalPages={
                            data?.getPodcastsCategoryPagenation.totalPages!
                        }
                    />
                </div>
            </div>
        </PageBackground>
    );
};
