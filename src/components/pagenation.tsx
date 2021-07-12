import React from "react";
import { Link } from "react-router-dom";

interface IPagenation {
    pathname: string;
    page: number;
    totalPages: number;
}

export const Pagenation: React.FC<IPagenation> = ({
    pathname,
    page,
    totalPages,
}) => {
    return (
        <ul className="flex justify-center mt-4 mb-12 space-x-3">
            <li>
                <Link
                    title="« Previous"
                    to={`${pathname}?page=${page - 1}`}
                    className={`${
                        page < 2 ? "hidden" : ""
                    } flex items-center px-4 py-2 space-x-3  transition-colors duration-200 transform border rounded-lg text-gray-200 border-gray-200 hover:bg-gray-700 focus:outline-none`}
                >
                    « Previous
                </Link>
            </li>
            <li>
                <Link
                    title="Next »"
                    to={`${pathname}?page=${page + 1}`}
                    className={`${
                        totalPages === page ? "hidden" : ""
                    } flex items-center px-4 py-2 space-x-3  transition-colors duration-200 transform border rounded-lg text-gray-200 dark:border-gray-200 hover:bg-gray-700 focus:outline-none`}
                >
                    Next »
                </Link>
            </li>
        </ul>
    );
};
