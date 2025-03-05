import React from "react";
import { algoDetails } from "../algoDetails/algos.js";
import { getValues } from "./utils";

const Details = ({
    sortingAlgo,
    setSortingAlgo,
    arraySize,
    setArraySize,
    data,
    setData,
    speedValue,
    setSpeedValue,
}) => {
    return (
        <div className="details w-full flex gap-4  rounded-xl flex-col shadow-lg lg:max-w-[50%]">
            {/* Algorithm Selection Buttons */}
            <div className="choose-alg bg-[#3c3c3b] p-4 rounded-lg flex gap-4 shadow-md ">
                {["selection", "bubble", "insertion", "merge", "quick"].map(
                    (algo) => (
                        <button
                            key={algo}
                            className={`p-2 px-4 rounded-lg text-black ${
                                sortingAlgo === algo
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-[#4682b4] hover:text-white"
                            } cursor-pointer transition-all duration-200 sm:text-sm md:text-base`}
                            onClick={() => setSortingAlgo(algo)}
                        >
                            {algo.charAt(0).toUpperCase() + algo.slice(1)} Sort
                        </button>
                    )
                )}
            </div>

            {/* inputs */}
            <div className="inputs bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col gap-4 shadow-md">
                <p className="flex flex-col sm:flex-row gap-5 items-center">
                    <span className="text-xl font-bold">Algorithm: </span>
                    <span className="bg-[#4682b4] text-white p-2 rounded-md">
                        {sortingAlgo.toUpperCase()} SORT
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row gap-4 items-center">
                    <label htmlFor="generate" className="text-xl font-bold">
                        New Array:
                    </label>
                    <span className="flex gap-2 items-center">
                        <input
                            value={arraySize}
                            onChange={(e) =>
                                setArraySize(Number(e.target.value))
                            }
                            type="number"
                            name="arraySize"
                            max="99"
                            min="0"
                            id="arraySize"
                            className="w-16 bg-white p-2 rounded-md text-black"
                        />
                        <button
                            className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-all duration-200 cursor-pointer active:bg-blue-600"
                            id="generate1"
                            onClick={() => getValues(arraySize, setData)}
                        >
                            Generate
                        </button>
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row gap-4 items-center">
                    <label htmlFor="data" className="text-xl font-bold">
                        Input data:
                    </label>
                    <input
                        type="text"
                        name="data"
                        id="data"
                        value={data}
                        className="bg-white text-black p-2 rounded-md flex-1"
                        onChange={(e) => {
                            const newData = e.target.value
                                .split(",")
                                .map(Number);
                            setData(newData);
                            setArraySize(newData.length);
                        }}
                    />
                </p>
                <p className="flex flex-col sm:flex-row gap-4 items-center">
                    <label htmlFor="speed" className="text-xl font-bold">
                        Speed ({speedValue}x):
                    </label>
                    <input
                        value={speedValue}
                        type="range"
                        name="speed"
                        id="speed"
                        min={1}
                        max={10}
                        className="flex-1"
                        onChange={(e) => setSpeedValue(Number(e.target.value))}
                    />
                </p>
            </div>
            <div className="algo-details bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col shadow-md flex-1/2">
                <h2 className="text-xl font-bold mb-2">Pseudocode:</h2>
                <pre className="bg-[#282828] p-4 rounded-lg overflow-auto">
                    {algoDetails.map((algorithm) => {
                        if (algorithm.algo === sortingAlgo) {
                            return (
                                <div key={algorithm.id}>
                                    {algorithm.sudo_code}
                                </div>
                            );
                        }
                    })}
                </pre>
                <div className="algo-details bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col">
                    {algoDetails.map((currentAlgo) => {
                        if (currentAlgo.algo === sortingAlgo) {
                            return (
                                <div key={currentAlgo.id}>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center my-2">
                                        <div className="bg-[#282828] p-4 rounded-lg">
                                            <h2 className="text-lg font-semibold mb-2">
                                                Time Complexity:
                                            </h2>
                                            <p>Best: {currentAlgo.best_TC}</p>
                                            <p>
                                                Average:{" "}
                                                {currentAlgo.average_TC}
                                            </p>
                                            <p>Worst: {currentAlgo.worst_TC}</p>
                                        </div>
                                        <div className="bg-[#282828] p-4 rounded-lg">
                                            <h2 className="text-lg font-semibold mb-2">
                                                Space Complexity:
                                            </h2>
                                            <p>Best: {currentAlgo.best_SC}</p>
                                            <p>
                                                Average:{" "}
                                                {currentAlgo.average_SC}
                                            </p>
                                            <p>Worst: {currentAlgo.worst_SC}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <h2 className="text-xl font-bold mb-2">Video Reference:</h2>
                <pre className="bg-[#282828] p-4 rounded-lg overflow-auto">
                    {algoDetails.map((algorithm) => {
                        if (algorithm.algo === sortingAlgo) {
                            return (
                                <div key={algorithm.id}>
                                    <a
                                        href={algorithm.reference}
                                        target="_blank"
                                        className="hover:text-blue-400"
                                    >
                                        {algorithm.reference}
                                    </a>
                                </div>
                            );
                        }
                    })}
                </pre>
            </div>
        </div>
    );
};

export default Details;
