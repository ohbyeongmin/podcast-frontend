import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "../../../__generated__/globalTypes";
import { useParams } from "react-router-dom";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { uploadAwsS3 } from "../../../utils/utils";
import { Button } from "../../../components/button";
import {
    editPodcastMutation,
    editPodcastMutationVariables,
} from "../../../__generated__/editPodcastMutation";

interface IEditPodcast {
    title: string;
    description: string;
    coverImg: string;
    category: Category;
    refetch: () => {};
}

type TypeUpdatePodcast = {
    newTitle: string;
    newDescription: string;
    newCoverImg: FileList;
    newCategory: Category;
};

type TypeParams = {
    id: string;
};

const EDIT_PODCAST_MUTATION = gql`
    mutation editPodcastMutation($input: UpdatePodcastInput!) {
        updatePodcast(input: $input) {
            ok
            error
        }
    }
`;

export const DashboardEdit: React.FC<IEditPodcast> = ({
    title,
    description,
    category,
    coverImg,
    refetch,
}) => {
    const client = useApolloClient();
    const { id: podcastId } = useParams<TypeParams>();
    const [uploading, setUploading] = useState(false);
    const [coverUrl, setCoverUrl] = useState(coverImg);
    const { register, getValues, handleSubmit } = useForm<TypeUpdatePodcast>({
        defaultValues: {
            newTitle: title,
            newDescription: description,
            newCategory: category,
        },
    });

    const onCompleted = async (data: editPodcastMutation) => {
        const {
            updatePodcast: { ok },
        } = data;
        if (ok) {
            setUploading(false);
            await refetch();
            const { newTitle, newDescription } = getValues();
            let cacheTitle = title !== newTitle ? newTitle : title;
            let cacheCoverImg = coverImg !== coverUrl ? coverUrl : coverImg;
            let cacheDescription =
                description !== newDescription ? newDescription : description;

            client.writeFragment({
                id: `Podcast:${podcastId}`,
                fragment: gql`
                    fragment EditedPodcast on Podcast {
                        title
                        coverImg
                        description
                    }
                `,
                data: {
                    title: cacheTitle,
                    coverImg: cacheCoverImg,
                    description: cacheDescription,
                },
            });
        }
    };

    const [editPodcastMutation] = useMutation<
        editPodcastMutation,
        editPodcastMutationVariables
    >(EDIT_PODCAST_MUTATION, {
        onCompleted,
    });

    const onSubmit = async () => {
        try {
            const { newTitle, newDescription, newCoverImg, newCategory } =
                getValues();
            let url = coverImg;
            if (newCoverImg[0]) {
                setUploading(true);
                url = await uploadAwsS3(newCoverImg[0]);
                setCoverUrl(url);
            }
            console.log(coverUrl);

            editPodcastMutation({
                variables: {
                    input: {
                        id: +podcastId,
                        payload: {
                            title: newTitle,
                            description: newDescription,
                            coverImg: url,
                            category: newCategory,
                        },
                    },
                },
            });
        } catch (e) {}
    };

    return (
        <div className="w-full max-w-xs md:max-w-lg m-auto pt-10">
            <div className="text-center rounded-xl py-7 px-5 shadow-md border-b-8 border-black bg-trueGray-800">
                <h1 className="font-semibold text-2xl">Edit Podcast</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-8"
                >
                    <div className="flex flex-col w-full items-start">
                        <label>Title</label>
                        <input
                            className="bg-gray-100 text-black w-full py-1 px-3 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            {...register("newTitle")}
                            type="text"
                        ></input>
                    </div>
                    <div className="flex flex-col w-full items-start">
                        <label>Description</label>
                        <textarea
                            className="bg-gray-100 text-black w-full py-1 px-4 rounded-lg  shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            {...register("newDescription")}
                        ></textarea>
                    </div>
                    <div className="flex flex-col w-full items-start">
                        <label>Description</label>
                        <input
                            {...register("newCoverImg")}
                            type="file"
                            accept="image/*"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label>Cover Image</label>
                        <select
                            className="bg-gray-100 w-full text-black py-1 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            {...register("newCategory")}
                        >
                            {Object.keys(Category).map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <Button
                        canClick={true}
                        loading={uploading}
                        actionText={"Update Podcast"}
                    ></Button>
                </form>
            </div>
        </div>
    );
};
