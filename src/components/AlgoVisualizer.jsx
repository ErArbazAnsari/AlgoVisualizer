import React, { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { algoDetails } from "../algoDetails/algos";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const AlgoVisualizer = () => {
    const [data, setData] = useState([]);
    const [sortingAlgo, setSortingAlgo] = useState("selection");
    const [speedValue, setSpeedValue] = useState(7.5);
    const [currentIndices, setCurrentIndices] = useState([]);
    const [arraySize, setArraySize] = useState(40);
    const [mute, setMute] = useState(false);
    const [audio, setAudio] = useState(0.2);
    const [working, setWorking] = useState(false);

    // random value generator
    function valueGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // getValue - random
    function getValues() {
        const initialData = [];
        for (let i = 0; i < arraySize; i++) {
            initialData.push(valueGenerator(10, 100));
        }
        setData(initialData);
    }

    /* main algos and logic for sound */
    let audioCtx = null;
    let gainNode = null; // For volume control

    // Frequencies for a pentatonic scale (sweet and pleasant to the ear)
    const frequencies = {
        comparison: 440, // (default for comparison)
        swap: 523.25, // (default for swap)
    };

    // Default volume (0 to 1)
    let volume = audio;

    const playNote = (freq) => {
        if (audioCtx == null) {
            audioCtx = new (AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain(); // Create a gain node for volume control
            gainNode.connect(audioCtx.destination); // Connect gain node to audio context
        }

        const dur = 0.1; // Duration of the note
        const osc = audioCtx.createOscillator();
        osc.frequency.value = freq; // Set the frequency of the note

        // Set the volume using the gain node
        gainNode.gain.value = volume;

        osc.start();
        osc.stop(audioCtx.currentTime + dur);
        osc.connect(gainNode); // Connect oscillator to gain node
    };

    // main sorting function and sound effect logic
    const handleSort = () => {
        if (sortingAlgo === "bubble") {
            (async () => {
                let swapped;
                for (let i = 0; i < data.length - 1; i++) {
                    swapped = false; // Track if any swap happened

                    for (let j = 0; j < data.length - i - 1; j++) {
                        setCurrentIndices([j, j + 1]); // Highlight current and comparing element

                        playNote(frequencies.comparison); // Play comparison sound

                        if (data[j] > data[j + 1]) {
                            [data[j], data[j + 1]] = [data[j + 1], data[j]];
                            setData([...data]);
                            swapped = true; // Mark that a swap happened

                            playNote(frequencies.swap); // Play swap sound
                        }

                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                        setCurrentIndices([]); // Unselect after processing
                    }

                    if (!swapped) break; // Stop if no swaps happened (array is sorted)
                }
            })();
        } else if (sortingAlgo === "selection") {
            (async () => {
                for (let i = 0; i < data.length - 1; i++) {
                    let minIndex = i;

                    for (let j = i + 1; j < data.length; j++) {
                        setCurrentIndices([minIndex, j]); // Highlight current min and comparing element

                        playNote(frequencies.comparison); // Play comparison sound

                        if (data[j] < data[minIndex]) {
                            minIndex = j;
                        }

                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                    }

                    if (minIndex !== i) {
                        // Swap only if needed
                        [data[i], data[minIndex]] = [data[minIndex], data[i]];
                        setData([...data]);

                        playNote(frequencies.swap); // Play swap sound
                    }

                    setCurrentIndices([]); // Unselect after swapping
                }
            })();
        } else if (sortingAlgo === "insertion") {
            (async () => {
                for (let i = 1; i < data.length; i++) {
                    let key = data[i];
                    let j = i - 1;

                    setCurrentIndices([i]); // Highlight the current element being inserted

                    while (j >= 0 && data[j] > key) {
                        setCurrentIndices([j, j + 1]); // Highlight current and comparing elements

                        playNote(frequencies.comparison); // Play comparison sound

                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );

                        data[j + 1] = data[j]; // Shift element
                        setData([...data]);

                        playNote(frequencies.swap); // Play swap sound

                        j--;
                    }

                    data[j + 1] = key;
                    setData([...data]);

                    setCurrentIndices([]); // Unselect after insertion
                }
            })();
        } else if (sortingAlgo === "merge") {
            (async () => {
                const mergeSort = async (array, start, end) => {
                    if (start < end) {
                        const mid = Math.floor((start + end) / 2);
                        await mergeSort(array, start, mid);
                        await mergeSort(array, mid + 1, end);
                        await merge(array, start, mid, end);
                    }
                };

                const merge = async (array, start, mid, end) => {
                    const leftArray = array.slice(start, mid + 1);
                    const rightArray = array.slice(mid + 1, end + 1);
                    let i = 0,
                        j = 0,
                        k = start;

                    while (i < leftArray.length && j < rightArray.length) {
                        setCurrentIndices([k, mid + j + 1]); // Highlight merging elements

                        playNote(frequencies.comparison); // Play comparison sound

                        if (leftArray[i] <= rightArray[j]) {
                            array[k] = leftArray[i];
                            i++;
                        } else {
                            array[k] = rightArray[j];
                            j++;
                        }
                        setData([...array]);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                        setCurrentIndices([]); // Unselect after processing
                        k++;
                    }

                    while (i < leftArray.length) {
                        setCurrentIndices([k, mid + i + 1]);
                        array[k] = leftArray[i];
                        i++;
                        k++;
                        setData([...array]);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                        setCurrentIndices([]);
                    }

                    while (j < rightArray.length) {
                        setCurrentIndices([k, mid + j + 1]);
                        array[k] = rightArray[j];
                        j++;
                        k++;
                        setData([...array]);
                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                        setCurrentIndices([]);
                    }
                };

                await mergeSort(data, 0, data.length - 1);
            })();
        } else if (sortingAlgo === "quick") {
            (async () => {
                const quickSort = async (array, low, high) => {
                    if (low < high) {
                        const pi = await partition(array, low, high);
                        await quickSort(array, low, pi - 1);
                        await quickSort(array, pi + 1, high);
                    }
                };

                const partition = async (array, low, high) => {
                    const pivot = array[high];
                    let i = low - 1;

                    for (let j = low; j < high; j++) {
                        setCurrentIndices([j, high]); // Highlight current and pivot element

                        playNote(frequencies.comparison); // Play comparison sound

                        if (array[j] < pivot) {
                            i++;
                            if (i !== j) {
                                // Swap only if needed
                                [array[i], array[j]] = [array[j], array[i]];
                                setData([...array]);

                                playNote(frequencies.swap); // Play swap sound

                                await new Promise((resolve) =>
                                    setTimeout(resolve, 500 / speedValue)
                                );
                            }
                        }
                    }

                    if (i + 1 !== high) {
                        // Swap pivot into correct position only if needed
                        [array[i + 1], array[high]] = [
                            array[high],
                            array[i + 1],
                        ];
                        setData([...array]);

                        playNote(frequencies.swap); // Play swap sound

                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );
                    }

                    setCurrentIndices([]); // Unselect after partitioning
                    return i + 1;
                };

                await quickSort(data, 0, data.length - 1);
            })();
        }
    };
    /* -------------------------------------section end------------------------------------- */

    // getting random value on load
    useEffect(() => {
        getValues();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 bg-[#2b2b2a] min-h-screen">
            {/* Select any algo */}
            <div className="choose-alg flex justify-center mb-4">
                <div className="flex flex-wrap gap-2 p-3 bg-gray-500 rounded-xl shadow-lg">
                    {["selection", "bubble", "insertion", "merge", "quick"].map(
                        (algo) => (
                            <button
                                key={algo}
                                className={`p-2 px-4 rounded-lg text-white ${
                                    sortingAlgo === algo
                                        ? "bg-blue-600"
                                        : "bg-[#3c3c3a]"
                                } cursor-pointer transition-all duration-200 sm:text-sm md:text-base`}
                                onClick={() => setSortingAlgo(algo)}
                            >
                                {algo.charAt(0).toUpperCase() + algo.slice(1)}{" "}
                                Sort
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Visualization Section */}
            <div className="visualization flex flex-col lg:flex-row justify-center w-full gap-4 ">
                {/* Details Section */}
                <div className="details w-full flex gap-4 p-4 bg-gray-500 rounded-xl flex-col shadow-lg lg:max-w-[50%]">
                    <div className="inputs bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col gap-4 shadow-md">
                        <p className="flex flex-col sm:flex-row gap-5 items-center">
                            <span className="text-xl font-bold">
                                Algorithm:{" "}
                            </span>
                            <span className="bg-blue-600 text-white p-2 rounded-md">
                                {sortingAlgo.toUpperCase()} SORT
                            </span>
                        </p>
                        <p className="flex flex-col sm:flex-row gap-4 items-center">
                            <label
                                htmlFor="generate"
                                className="text-xl font-bold"
                            >
                                New Array:
                            </label>
                            <span className="flex gap-2 items-center">
                                <input
                                    value={arraySize}
                                    onChange={(e) => {
                                        setArraySize(e.target.value);
                                        // getValues();
                                    }}
                                    type="number"
                                    name="arraySize"
                                    id="arraySize"
                                    className="w-16 bg-white p-2 rounded-md text-black"
                                />
                                <button
                                    className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-all duration-200 cursor-pointer active:bg-blue-600"
                                    onClick={() => {
                                        getValues();
                                    }}
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
                            <label
                                htmlFor="speed"
                                className="text-xl font-bold"
                            >
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
                                onChange={(e) => setSpeedValue(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className="algo-details bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col shadow-md">
                        {algoDetails.map((currentAlgo) => {
                            if (currentAlgo.algo === sortingAlgo) {
                                return (
                                    <div key={currentAlgo.id}>
                                        <h3 className="text-xl font-bold mb-2">
                                            {currentAlgo.algo
                                                .charAt(0)
                                                .toUpperCase() +
                                                currentAlgo.algo.slice(1)}{" "}
                                            Sort
                                        </h3>
                                        <p className="mb-4">
                                            {currentAlgo.description}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                                            <div className="bg-[#282828] p-4 rounded-lg">
                                                <h2 className="text-lg font-semibold mb-2">
                                                    Time Complexity:
                                                </h2>
                                                <p>
                                                    Best: {currentAlgo.best_TC}
                                                </p>
                                                <p>
                                                    Average:{" "}
                                                    {currentAlgo.average_TC}
                                                </p>
                                                <p>
                                                    Worst:{" "}
                                                    {currentAlgo.worst_TC}
                                                </p>
                                            </div>
                                            <div className="bg-[#282828] p-4 rounded-lg">
                                                <h2 className="text-lg font-semibold mb-2">
                                                    Space Complexity:
                                                </h2>
                                                <p>
                                                    Best: {currentAlgo.best_SC}
                                                </p>
                                                <p>
                                                    Average:{" "}
                                                    {currentAlgo.average_SC}
                                                </p>
                                                <p>
                                                    Worst:{" "}
                                                    {currentAlgo.worst_SC}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className="algo-details bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-col shadow-md">
                        <details>
                            <summary className="text-xl font-bold cursor-pointer">
                                More details
                            </summary>
                            <h2 className="text-xl font-bold my-2">
                                Pseudocode:
                            </h2>
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
                            <h2 className="text-xl font-bold my-2">
                                Video Reference:
                            </h2>
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
                        </details>
                    </div>
                </div>

                {/* Graph Section */}
                <div className="graph w-full flex gap-4 p-4 bg-gray-500 rounded-xl flex-col flex-1 shadow-lg lg:max-w-[50%]">
                    <div className="graph bg-[#3c3c3b] p-4 rounded-lg text-white flex flex-1 shadow-md sm:min-h-96">
                        {data.map((value, index) => {
                            const maxValue = Math.max(...data);
                            const heightPercentage = (value / maxValue) * 100;
                            const isCurrent = currentIndices.includes(index);
                            return (
                                <div
                                    key={index}
                                    style={{
                                        height: `${heightPercentage}%`,
                                        width: "20px",
                                        margin: "0 2px",
                                        alignSelf: "flex-end",
                                        backgroundColor: isCurrent
                                            ? "white"
                                            : "#2a7ff9",
                                    }}
                                    className="bg-blue-400"
                                ></div>
                            );
                        })}
                    </div>
                    <div className="controls bg-[#3c3c3b] p-4 rounded-lg text-white flex justify-center shadow-md gap-4">
                        <span>
                            {working ? (
                                <button
                                    className="bg-red-500 p-2 rounded-md hover:bg-red-600 transition-all duration-200 cursor-pointer active:bg-red-500 text-black"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                >
                                    <TfiReload className="text-white font-bold text-xl" />
                                </button>
                            ) : (
                                <button
                                    className="bg-white p-2 rounded-md hover:bg-blue-200 transition-all duration-200 cursor-pointer active:bg-white text-black select-none"
                                    onClick={async () => {
                                        setWorking(true);
                                        await handleSort(); // Ensure sorting completes
                                        setWorking(false);
                                    }}
                                >
                                    Start Sorting
                                </button>
                            )}
                        </span>
                        <span
                            className="bg-white p-2 rounded-md hover:bg-blue-200 transition-all duration-200 cursor-pointer active:bg-white text-black flex items-center text-2xl"
                            onClick={() => {
                                setMute((prev) => !prev);
                                setAudio((prev) => (prev === 0 ? 0.2 : 0));
                            }}
                        >
                            {mute ? <HiSpeakerXMark /> : <HiSpeakerWave />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgoVisualizer;
