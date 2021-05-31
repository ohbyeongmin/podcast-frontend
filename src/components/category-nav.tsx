import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ActiveMenuBar } from "./activeMenuBar";

interface ICategoryNavProps {
	categories: string[];
}

export const CategoryNav: React.FC<ICategoryNavProps> = ({ categories }) => {
	const categoryNavRef = useRef<HTMLDivElement>(null);
	const location = useLocation().pathname.slice(1);

	return (
		<div className="w-full bg-red-400 bg-opacity-10 border-b-2 border-red-200">
			<ActiveMenuBar categoryNavRef={categoryNavRef} pathName={location} />
			<ul className="grid grid-cols-5 items-center max-w-md mx-auto text-sm font-md text-red-400">
				{categories.map((category, index) => (
					<div key={index} ref={categoryNavRef}>
						<Link to={category === "All" ? "/" : `/${category}`}>
							<li className="py-2 text-center cursor-pointer">{category}</li>
						</Link>
					</div>
				))}
			</ul>
		</div>
	);
};
