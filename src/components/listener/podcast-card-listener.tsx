import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { Category } from "../../__generated__/globalTypes";
import {
    subscribeMutation,
    subscribeMutationVariables,
} from "../../__generated__/subscribeMutation";

type TypeListener = {
    id: number;
};

type TypeReview = {
    id: number;
};

type TypePodcast = {
    id: number;
    title: string;
    description: string;
    category: Category;
    rating: number;
    coverImg?: string | null;
    listeners?: TypeListener[] | null;
    reviews?: TypeReview[] | null;
};

interface IPodcastCard {
    podcast: TypePodcast;
    refetch: () => {};
}

export const SUBSCRIBE_MUTATION = gql`
    mutation subscribeMutation($input: ToggleSubscribeInput!) {
        toggleSubscribe(input: $input) {
            ok
            error
        }
    }
`;

export const PodcastCardListener: React.FC<IPodcastCard> = ({
    podcast,
    refetch,
}) => {
    const { data } = useMe();
    const [cardWidth, setCardWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(0);
    const [windowSize, setWindowSize] = useState<number>();

    const onCompleted = (data: subscribeMutation) => {
        const {
            toggleSubscribe: { ok },
        } = data;
        if (ok) {
            refetch();
        }
    };

    const [subscribeMutation] = useMutation<
        subscribeMutation,
        subscribeMutationVariables
    >(SUBSCRIBE_MUTATION, { onCompleted });

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        subscribeMutation({
            variables: {
                input: {
                    podcastId: podcast.id,
                },
            },
        });
    };

    useEffect(() => {
        const front = document.querySelector("#front");
        const handleResize = () => {
            return setWindowSize(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        setCardWidth(front?.clientWidth!);
        setCardHeight(front?.clientHeight!);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowSize]);

    return (
        <Link to={`/podcast/${podcast.id}`} className="relative">
            <div
                style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                }}
                className="absolute bg-black h-10 p-4 m-4 rounded-3xl"
            ></div>
            <div
                id="front"
                className="bg-trueGray-800 shadow-lg rounded-2xl p-4 m-4 transform  sm:hover:-translate-x-3 sm:hover:-translate-y-3 duration-500 ease-in-out"
            >
                <div className="flex-none sm:flex">
                    <div className="h-32 w-32  sm:mb-0 mb-3">
                        <img
                            src={podcast.coverImg! as string}
                            alt="coverImg"
                            className=" w-32 h-32 object-cover rounded-full"
                        />
                    </div>
                    <div className="flex-auto sm:ml-5 justify-evenly">
                        <div className="flex items-center justify-between sm:mt-2">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                                        {podcast.title}
                                    </div>
                                    <div className="flex-auto text-gray-400 my-1">
                                        <span className="mr-3 ">
                                            {podcast.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {podcast.description.length > 42
                                ? `${podcast.description.slice(0, 42)}...`
                                : podcast.description}
                        </div>
                        <div className="flex pt-2  text-sm text-gray-400">
                            <div className="flex-1 inline-flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                </svg>
                                <p className="">
                                    {podcast.listeners?.length} Followers
                                </p>
                            </div>
                            <div className="flex-1 inline-flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="">
                                    {podcast.reviews?.length} Comments
                                </p>
                            </div>
                            <button
                                onClick={onClick}
                                className=" flex-no-shrink bg-green-400 hover:bg-green-600 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300 focus:outline-none"
                            >
                                {podcast.listeners?.find(
                                    (listener) => listener.id === data?.me.id
                                )
                                    ? "UNFOLLOW"
                                    : "FOLLOW"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
