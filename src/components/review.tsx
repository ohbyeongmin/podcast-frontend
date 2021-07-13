import React from "react";

interface IReview {
    email: string;
    text: string;
}

export const Review: React.FC<IReview> = ({ email, text }) => {
    return (
        <div className="flex flex-col">
            <div
                className="w-min flex items-center px-3 mb-1 py-1 text-xs text-trueGray-900 rounded-full"
                style={{
                    background: `hsla(${~~(360 * Math.random())},70%,70%,1)`,
                }}
            >
                {email}
            </div>
            <p className="text-sm">{text}</p>
        </div>
    );
};
