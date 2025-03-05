import React, { useEffect, useState } from "react";
import Controls from "./Controls";
import Graph from "./Graph";
import Details from "./Details";
import { sortingFunctions } from "./SortingAlgorithms";
import { getValues } from "./utils";
import { useAudio } from "./AudioManager";

const AlgoVisualizer = () => {
    const [data, setData] = useState([]);
    const [sortingAlgo, setSortingAlgo] = useState(
        localStorage.getItem("sortingAlgo") || "merge"
    );
    const [speedValue, setSpeedValue] = useState(
        parseFloat(localStorage.getItem("speedValue")) || 6
    );
    const [currentIndices, setCurrentIndices] = useState([]);
    const [arraySize, setArraySize] = useState(
        parseInt(localStorage.getItem("arraySize")) || 28
    );
    const [mute, setMute] = useState(
        localStorage.getItem("mute") === "true" || false
    );
    const [audio, setAudio] = useState(
        parseFloat(localStorage.getItem("audio")) || 0.2
    );
    const [working, setWorking] = useState(false);
    const [stopSorting, setStopSorting] = useState(false);

    const { playNote } = useAudio(mute, audio);

    useEffect(() => {
        getValues(arraySize, setData);
    }, [arraySize]);

    useEffect(() => {
        localStorage.setItem("sortingAlgo", sortingAlgo);
    }, [sortingAlgo]);

    useEffect(() => {
        localStorage.setItem("arraySize", arraySize);
    }, [arraySize]);

    useEffect(() => {
        localStorage.setItem("speedValue", speedValue);
    }, [speedValue]);

    useEffect(() => {
        localStorage.setItem("mute", mute);
    }, [mute]);

    useEffect(() => {
        localStorage.setItem("audio", audio);
    }, [audio]);

    const handleSort = async () => {
        setStopSorting(false);
        setWorking(true);
        if (sortingFunctions[sortingAlgo]) {
            await sortingFunctions[sortingAlgo](
                data,
                setData,
                setCurrentIndices,
                speedValue,
                stopSorting,
                playNote
            );
        }
        setWorking(false);
    };

    return (
        <div className="flex gap-4 p-4 min-h-screen">
            <Details
                sortingAlgo={sortingAlgo}
                setSortingAlgo={setSortingAlgo}
                arraySize={arraySize}
                setArraySize={setArraySize}
                data={data}
                setData={setData}
                speedValue={speedValue}
                setSpeedValue={setSpeedValue}
            />
            <div className="visualization flex sm:flex-col justify-center w-full gap-4">
                <Graph
                    data={data}
                    currentIndices={currentIndices}
                    sortingAlgo={sortingAlgo}
                />
                <Controls
                    working={working}
                    handleSort={handleSort}
                    setMute={setMute}
                    setAudio={setAudio}
                    mute={mute}
                    getValues={() => getValues(arraySize, setData)}
                />
            </div>
        </div>
    );
};

export default AlgoVisualizer;
