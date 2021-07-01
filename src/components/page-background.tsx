import React from "react";

export const PageBackground: React.FC = ({ children }) => {
	return (
		<div className="w-full h-screen bg-backgroungColor  text-white">
			{children}
		</div>
	);
};
