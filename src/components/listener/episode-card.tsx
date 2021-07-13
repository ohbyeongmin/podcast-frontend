import React, { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AudioPlayer from "react-h5-audio-player";

interface IAudioPlayer {
    eid: number;
    title: string;
    audioUrl: string;
}

export const EpisodeCardListener: React.FC<IAudioPlayer> = ({
    eid,
    title,
    audioUrl,
}) => {
    const [playerHide, setPlayerHide] = useState(true);

    const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const a: HTMLAudioElement = document.querySelector(
            `.eid${eid} > audio`
        )! as HTMLAudioElement;
        e.preventDefault();
        setPlayerHide(!playerHide);
        a.pause();
    };
    return (
        <div className="border p-4 mb-4 rounded-lg">
            <div className="relative">
                <div
                    onClick={onClickCard}
                    className="w-full absolute z-10 cursor-pointer opacity-0 h-10"
                />
                <div className={`flex items-center justify-between w-full`}>
                    <h1 className="text-lg sm:text-2xl mb-5">{title}</h1>
                    <FontAwesomeIcon
                        className={`sm:text-2xl ${!playerHide && "hidden"}`}
                        icon={faChevronDown}
                    />
                    <FontAwesomeIcon
                        className={`sm:text-2xl ${playerHide && "hidden"}`}
                        icon={faChevronUp}
                    />
                </div>
                <div
                    className={`${playerHide ? "max-h-0 hidden" : "max-h-100"}`}
                >
                    <AudioPlayer
                        className={`eid${eid} bg-trueGray-100 rounded-lg`}
                        src={audioUrl}
                    />
                </div>
            </div>
        </div>
    );
};
