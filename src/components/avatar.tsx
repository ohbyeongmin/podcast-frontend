import React from "react";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TypeAvatar = {
    size?: string;
};

export const Avatar: React.FC<TypeAvatar> = ({ size = "10" }) => {
    return (
        <div className="w-14 h-14 flex justify-center items-center">
            <div className="relative">
                <div
                    id="avatar"
                    className="absolute cursor-pointer w-10 h-10 -top-5 -left-1"
                ></div>
            </div>
            <FontAwesomeIcon
                id="avatar"
                icon={faUserAlt}
                className="text-white text-3xl"
            />
        </div>
    );
};
