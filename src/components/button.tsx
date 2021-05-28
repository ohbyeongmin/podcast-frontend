import React from "react";

interface IButtonProps {
	canClick: boolean;
	loading: boolean;
	actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
	canClick,
	loading,
	actionText,
}) => {
	return (
		<button
			className={` transition-all duration-500 opacity-60 py-3 px-4 font-bold shadow-md focus:outline-none text-white ${
				canClick
					? "bg-green-400 hover:opacity-100"
					: "bg-gray-300 pointer-events-none"
			}  rounded-lg `}
		>
			{loading ? "Loading..." : actionText}
		</button>
	);
};
