import React from "react";
import { TfiReload } from "react-icons/tfi";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Controls = ({
    working,
    handleSort,
    setMute,
    setAudio,
    mute,
    getValues,
}) => {
    return (
        <div className="controls bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col sm:flex-row justify-center items-center shadow-md gap-4 w-full lg:w-[100%]">
            <button
                className={`p-2 rounded-md transition-all duration-200 cursor-pointer w-full sm:w-auto ${
                    working
                        ? "bg-red-400 hover:bg-red-500"
                        : "bg-white hover:bg-blue-500 hover:text-white text-black"
                }`}
                onClick={(e) => {
                    if (working) {
                        e.disabled = true;
                        window.location.reload();
                    } else handleSort();
                }}
                aria-label={working ? "Stop Sorting" : "Start Sorting"}
            >
                {working ? (
                    <TfiReload className="text-white font-bold text-2xl animate-spin " />
                ) : (
                    "Start Sorting"
                )}
            </button>
            <button
                className="bg-white p-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer text-black text-2xl flex items-center justify-center w-full sm:w-auto"
                id="sound"
                onClick={() => {
                    setMute((prev) => !prev);
                    setAudio((prev) => (prev === 0 ? 0.2 : 0));
                    window.location.reload();
                }}
                aria-label={mute ? "Unmute" : "Mute"}
            >
                {mute ? <HiSpeakerXMark /> : <HiSpeakerWave />}
            </button>
            <button
                className="p-2 rounded-md transition-all duration-200 cursor-pointer w-full sm:w-auto bg-white hover:bg-blue-500 text-black hover:text-white"
                id="generate2"
                onClick={getValues}
            >
                Generate
            </button>
        </div>
    );
};

export default Controls;
