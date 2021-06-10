import React from "react";

export const PageBackground: React.FC = ({ children }) => {
	return (
		<div className="w-full h-screen bg-black bg-opacity-90">{children}</div>
	);
};
