import React from "react";

export const PageBackground: React.FC = ({ children }) => {
    return (
        <div
            className={`w-full h-screen overflow-scroll  bg-backgroungColor  text-white`}
        >
            {children}
        </div>
    );
};
