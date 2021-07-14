import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ActiveMenuBar } from "./active-menu-bar";

interface ICategoryNavProps {
    categories: string[];
}

export const CategoryNav: React.FC<ICategoryNavProps> = ({ categories }) => {
    const categoryNavRef = useRef<HTMLDivElement>(null);
    const location = useLocation().pathname;
    const pathName = location.split("/")[1];

    return (
        <div className="w-full bg-trueGray-900 border-b-2 border-black">
            {(categories.includes(pathName) || location === "/") && (
                <ActiveMenuBar
                    categoryNavRef={categoryNavRef}
                    pathName={pathName}
                />
            )}
            <ul
                className={`grid grid-cols-5 items-center max-w-md mx-auto text-sm font-md text-red-500`}
            >
                {categories.map((category, index) => (
                    <div key={index} ref={categoryNavRef}>
                        <Link to={category === "All" ? "/" : `/${category}`}>
                            <li className="py-2 text-center cursor-pointer">
                                {category}
                            </li>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    );
};
