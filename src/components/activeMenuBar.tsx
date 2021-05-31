import React, { useEffect, useState } from "react";
import { Category } from "../__generated__/globalTypes";

interface IActiveMenuBarPrps {
	categoryNavRef: React.RefObject<HTMLDivElement>;
	pathName: string;
}

export const ActiveMenuBar: React.FC<IActiveMenuBarPrps> = ({
	categoryNavRef,
	pathName,
}) => {
	const [activeBarRect, setActiveBarRect] = useState<number[]>([]);
	const [activeBarPos, setActiveBarPos] = useState<number>();
	const [windowSize, setWindowSize] = useState<number>();

	const handleResize = () => {
		return setWindowSize(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		const node = categoryNavRef.current;
		const activeBarWidth = node?.clientWidth as number;
		const activeBarHeight = node?.clientHeight as number;
		const navStart =
			(node?.getBoundingClientRect().x as number) -
			((node?.parentElement?.childNodes.length as number) - 1) * activeBarWidth;
		setActiveBarRect([activeBarWidth, activeBarHeight]);
		const move = (Object.keys(Category).indexOf(pathName) + 1) * activeBarWidth;
		setActiveBarPos(navStart + move);
	}, [categoryNavRef, pathName, windowSize]);

	return (
		<div
			className={`absolute border-b-4 bg-red-400 bg-opacity-10 border-green-400 pointer-events-none transition-all duration-700 ease-in-out`}
			style={{
				left: `${activeBarPos}px`,
				width: `${activeBarRect[0]}px`,
				height: `${activeBarRect[1] + 2}px`,
			}}
		></div>
	);
};
