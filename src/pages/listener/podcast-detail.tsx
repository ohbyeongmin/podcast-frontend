import React from "react";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { podcastQuery } from "../../__generated__/podcastQuery";
import { Helmet } from "react-helmet-async";
import { PageBackground } from "../../components/page-background";
import { Review } from "../../components/review";
import { v4 as uuidv4 } from "uuid";
import { useMe } from "../../hooks/useMe";
import {
    subscribeMutation,
    subscribeMutationVariables,
} from "../../__generated__/subscribeMutation";
import { SUBSCRIBE_MUTATION } from "../../components/listener/podcast-card-listener";
import {
    reviewMutation,
    reviewMutationVariables,
} from "../../__generated__/reviewMutation";
import { useForm } from "react-hook-form";
import "react-h5-audio-player/lib/styles.css";
import { EpisodeCardListener } from "../../components/listener/episode-card";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface IParams {
    id: string;
}

const PODCAST_QUERY = gql`
    query podcastQuery($input: PodcastSearchInput!) {
        getPodcast(input: $input) {
            ok
            error
            podcast {
                title
                category
                coverImg
                description
                rating
                episodes {
                    id
                    title
                    audioUrl
                }
                reviews {
                    id
                    text
                    creator {
                        email
                    }
                }
                listeners {
                    id
                }
            }
        }
    }
`;

const REVIEW_MUTATION = gql`
    mutation reviewMutation($input: CreateReviewInput!) {
        createReview(input: $input) {
            error
            ok
            id
        }
    }
`;

export const PodcastDetail = () => {
    const client = useApolloClient();
    const { data: meData } = useMe();
    const params = useParams<IParams>();
    const { register, getValues, setValue, handleSubmit } = useForm();
    const { data, refetch, loading } = useQuery<podcastQuery>(PODCAST_QUERY, {
        variables: {
            input: {
                id: +params.id,
            },
        },
    });
    const onCompletedSubscribe = (data: subscribeMutation) => {
        const {
            toggleSubscribe: { ok },
        } = data;
        if (ok) {
            refetch();
        }
    };

    const onCompletedReview = (data: reviewMutation) => {
        try {
            const {
                createReview: { ok, id: reviewId },
            } = data;
            const { review } = getValues();
            if (ok) {
                setValue("review", "");
                const queryResult = client.readQuery({
                    query: PODCAST_QUERY,
                    variables: {
                        input: {
                            id: +params.id,
                        },
                    },
                });
                client.writeQuery({
                    query: PODCAST_QUERY,
                    data: {
                        getPodcast: {
                            ...queryResult.getPodcast,
                            podcast: {
                                ...queryResult.getPodcast.podcast,
                                reviews: [
                                    ...queryResult.getPodcast.podcast.reviews,
                                    {
                                        creator: {
                                            __typename: "User",
                                            email: meData?.me.email,
                                        },
                                        id: reviewId,
                                        text: review,
                                        __typename: "Review",
                                    },
                                ],
                            },
                        },
                    },
                    variables: {
                        input: {
                            id: +params.id,
                        },
                    },
                });
            }
        } catch (e) {}
    };

    const reviewSubmit = () => {
        try {
            const { review } = getValues();
            reviewMutation({
                variables: {
                    input: {
                        text: review,
                        podcastId: +params.id,
                    },
                },
            });
        } catch (e) {}
    };

    const [subscribeMutation] = useMutation<
        subscribeMutation,
        subscribeMutationVariables
    >(SUBSCRIBE_MUTATION, { onCompleted: onCompletedSubscribe });

    const [reviewMutation] = useMutation<
        reviewMutation,
        reviewMutationVariables
    >(REVIEW_MUTATION, { onCompleted: onCompletedReview });

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        subscribeMutation({
            variables: {
                input: {
                    podcastId: +params.id,
                },
            },
        });
    };

    return (
        <PageBackground>
            <Helmet>
                <title>{`Podcast | ${data?.getPodcast.podcast?.title}`}</title>
            </Helmet>

            <div className="max-w-5xl w-full mx-auto z-10">
                <div className="flex flex-col md:flex-row">
                    {loading ? (
                        <SkeletonTheme color="#262626" highlightColor="#333">
                            <p className="">
                                <Skeleton
                                    className="mt-7"
                                    duration={1}
                                    width={630}
                                    height={500}
                                />
                            </p>
                        </SkeletonTheme>
                    ) : (
                        <div className="md:w-8/12 p-8 ">
                            <div className="bg-trueGray-800 p-6 rounded-lg shadow-lg">
                                <div className="flex">
                                    <div className="w-20 h-20 bg-cover bg-center rounded-full mr-3 shadow-inner">
                                        <img
                                            src={
                                                data?.getPodcast.podcast
                                                    ?.coverImg! as string
                                            }
                                            alt="coverImg"
                                            className=" w-20 h-20 object-cover rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-200 font-medium md:text-2xl">
                                            {data?.getPodcast.podcast?.title}
                                        </p>
                                        <div className="flex items-center text-xs md:text-lg text-gray-400">
                                            <p>
                                                {
                                                    data?.getPodcast.podcast
                                                        ?.category
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-gray-400 text-sm">
                                        {data?.getPodcast.podcast?.description}
                                    </p>
                                </div>
                                <div className="mt-6 flex">
                                    <button
                                        onClick={onClick}
                                        className="flex items-center hover:opacity-75 mr-4 focus:outline-none"
                                    >
                                        <p className="mt-1 text-gray-200">
                                            {data?.getPodcast.podcast!.listeners?.find(
                                                (listener) =>
                                                    listener.id ===
                                                    meData?.me.id
                                            )
                                                ? "Un Follow"
                                                : "Follow"}
                                        </p>
                                    </button>
                                    <div className="flex items-center pointer-events-none">
                                        <i className="mr-2">
                                            <svg
                                                className="fill-current text-gray-200 w-6 h-6"
                                                height="512"
                                                viewBox="0 0 511.072 511.072"
                                                width="512"
                                            >
                                                <path d="M74.39 480.536H38.177l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-36.029-23.644-62.375-54.751-76.478-90.425C-2.04 277.611-3.811 238.37 6.932 199.776c12.89-46.309 43.123-88.518 85.128-118.853 45.646-32.963 102.47-50.387 164.33-50.387 77.927 0 143.611 22.389 189.948 64.745 41.744 38.159 64.734 89.63 64.734 144.933 0 26.868-5.471 53.011-16.26 77.703-11.165 25.551-27.514 48.302-48.593 67.619-46.399 42.523-112.042 65-189.83 65-28.877 0-59.01-3.855-85.913-10.929-25.465 26.123-59.972 40.929-96.086 40.929zm182-420c-124.039 0-200.15 73.973-220.557 147.285-19.284 69.28 9.143 134.743 76.043 175.115l7.475 4.511-.23 8.727c-.456 17.274-4.574 33.912-11.945 48.952 17.949-6.073 34.236-17.083 46.99-32.151l6.342-7.493 9.405 2.813c26.393 7.894 57.104 12.241 86.477 12.241 154.372 0 224.682-93.473 224.682-180.322 0-46.776-19.524-90.384-54.976-122.79-40.713-37.216-99.397-56.888-169.706-56.888z" />
                                            </svg>
                                        </i>
                                        <p className="mt-1 text-gray-200">
                                            {
                                                data?.getPodcast.podcast
                                                    ?.reviews?.length
                                            }{" "}
                                            Comments
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 border-gray-100 border-t pt-4 flex justify-between">
                                    <form
                                        onSubmit={handleSubmit(reviewSubmit)}
                                        className="w-full bg-trueGray-800 border-b border-trueGray-700 p-2"
                                    >
                                        <input
                                            {...register("review", {
                                                required: true,
                                            })}
                                            placeholder="Add comment"
                                            className="placeholder-gray-200 placeholder-opacity-50 text-gray-200 w-full  bg-trueGray-800 focus:outline-none"
                                            type="text"
                                        />
                                        <button />
                                    </form>
                                </div>
                                <div className="mt-6">
                                    {data?.getPodcast.podcast?.episodes.map(
                                        (episode) => {
                                            return (
                                                <EpisodeCardListener
                                                    key={uuidv4()}
                                                    eid={episode.id}
                                                    title={episode.title}
                                                    audioUrl={episode.audioUrl}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="px-8 md:p-10 h-screen  overflow-scroll md:w-4/12">
                        <h1 className="mb-3">Comments</h1>
                        {data?.getPodcast.podcast?.reviews &&
                            data?.getPodcast.podcast?.reviews
                                .map((review) => {
                                    return (
                                        <div key={uuidv4()} className="mb-10">
                                            <Review
                                                email={review.creator.email}
                                                text={review.text}
                                            />
                                        </div>
                                    );
                                })
                                .reverse()}
                    </div>
                </div>
            </div>
        </PageBackground>
    );
};
