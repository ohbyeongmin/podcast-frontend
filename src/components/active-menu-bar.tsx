import React, { useEffect, useState } from "react";
import { Category } from "../__generated__/globalTypes";

interface IActiveMenuBarPrps {
	categoryNavRef: React.RefObject<HTMLDivElement>;
	pathName: string;
}

type TypeActiveRect = {
	width: number;
	height: number;
};

export const ActiveMenuBar: React.FC<IActiveMenuBarPrps> = ({
	categoryNavRef,
	pathName,
}) => {
	const [activeBarRect, setActiveBarRect] = useState<TypeActiveRect>({
		width: 0,
		height: 0,
	});
	const [activeBarPos, setActiveBarPos] = useState<number>();
	const [windowSize, setWindowSize] = useState<number>();

	useEffect(() => {
		const handleResize = () => {
			return setWindowSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		const node = categoryNavRef.current;
		const activeBar: TypeActiveRect = {
			width: node?.clientWidth as number,
			height: node?.clientHeight as number,
		};
		const navStart =
			(node?.getBoundingClientRect().x as number) -
			((node?.parentElement?.childNodes.length as number) - 1) *
				activeBar.width;
		setActiveBarRect(activeBar);
		const move =
			(Object.keys(Category).indexOf(pathName) + 1) * activeBar.width;
		setActiveBarPos(navStart + move);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [categoryNavRef, pathName, windowSize]);

	return (
		<div
			className={`absolute border-b-4 bg-white bg-opacity-10 border-red-500 pointer-events-none transition-all duration-700 ease-in-out`}
			style={{
				left: `${activeBarPos}px`,
				width: `${activeBarRect.width}px`,
				height: `${activeBarRect.height + 2}px`,
			}}
		></div>
	);
};
