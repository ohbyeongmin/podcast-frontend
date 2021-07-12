import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

type TypeSearch = {
    search: string;
};

export const SearchBar: React.FC = () => {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { isValid },
    } = useForm<TypeSearch>({
        mode: "onChange",
    });
    const history = useHistory();

    const onSubmit = () => {
        const { search } = getValues();
        if (isValid) {
            history.push(`/search/${search}`);
        }
    };

    return (
        <div className="mx-auto mt-6 bg-tranparent border rounded-md border-gray-700 lg:w-96 focus-within:ring-1 ring-green-400 ring-primary focus-within:border-teal-800">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap justify-between md:flex-row"
            >
                <input
                    {...register("search", { required: true })}
                    type="text"
                    placeholder="Search Podcasts..."
                    className="flex-1 p-2 m-1  placeholder-gray-400 bg-transparent border-none appearance-none text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
                />
                <button className="flex justify-center p-2 m-1 text-white transition-colors duration-200 transform rounded-md bg-primary lg:w-auto focus:outline-none ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </button>
            </form>
        </div>
    );
};
