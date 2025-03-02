import React, { useEffect, useState } from "react";

const AlgoVisualizer = () => {
    const [data, setData] = useState([]);
    const [sortingAlgo, setSortingAlgo] = useState("selection");
    const [speedValue, setSpeedValue] = useState(5);
    const algoDetails = [
        {
            id: 1,
            algo: "bubble",
            best_TC: "O(n)",
            average_TC: "O(n^2)",
            worst_TC: "O(n^2)",
            best_SC: "O(1)",
            average_SC: "O(1)",
            worst_SC: "O(1)",
            description:
                "Bubble Sort repeatedly compares and swaps adjacent elements if they are in the wrong order. This continues until the list is sorted. It's simple but inefficient for large datasets due to its slow performance.",
            sudo_code: `1. Start from the first element.
2. Compare the current element with the next.
3. Swap if the current element is greater.
4. Move to the next element.
5. Repeat until the end of the list.
6. Repeat the process for all elements.`,
            reference: "https://www.youtube.com/watch?v=V3vM_m2iFtk",
        },
        {
            id: 2,
            algo: "selection",
            best_TC: "O(n^2)",
            average_TC: "O(n^2)",
            worst_TC: "O(n^2)",
            best_SC: "O(1)",
            average_SC: "O(1)",
            worst_SC: "O(1)",
            description:
                "Selection Sort works by scanning the unsorted part of a list, finding the smallest item, and swapping it with the first unsorted element. This process continues until the entire list is sorted. It performs better than Bubble Sort but is still inefficient for large datasets since it repeatedly scans the list, making the sorting process slow compared to more advanced algorithms like Quick Sort or Merge Sort.",
            sudo_code: `1. Find the smallest element in the unsorted part.
2. Swap it with the first unsorted element.
3. Move the boundary of the sorted part one element to the right.
4. Repeat until the entire list is sorted.`,
            reference: "https://www.youtube.com/watch?v=9_B6TmAHveU",
        },
        {
            id: 3,
            algo: "insertion",
            best_TC: "O(n)",
            average_TC: "O(n^2)",
            worst_TC: "O(n^2)",
            best_SC: "O(1)",
            average_SC: "O(1)",
            worst_SC: "O(1)",
            description:
                "Insertion Sort arranges a list by taking one item at a time and placing it in the correct position. It compares each new item with the sorted part and inserts it where it belongs. This method works well for small lists or when the data is almost sorted but is slow for large datasets.",
            sudo_code: `1. Start with the second element.
2. Compare it with elements in the sorted part.
3. Insert it into the correct position.
4. Move to the next element.
5. Repeat until the entire list is sorted.`,
            reference: "https://www.youtube.com/watch?v=YpZUgiT1N94",
        },
        {
            id: 4,
            algo: "merge",
            best_TC: "O(n log n)",
            average_TC: "O(n log n)",
            worst_TC: "O(n log n)",
            best_SC: "O(n)",
            average_SC: "O(n)",
            worst_SC: "O(n)",
            description:
                "Merge Sort works by repeatedly splitting a list into smaller halves until each half has only one element. Then, it merges these sorted halves back together in order. This 'divide and conquer' method makes it very efficient for large datasets. It is also stable, meaning it keeps the order of equal elements, making it a reliable choice for sorting when consistency matters.",
            sudo_code: `1. Divide the array into two halves.
2. Recursively sort each half.
3. Merge the sorted halves back together.
4. Repeat until the entire array is sorted.`,
            reference: "https://www.youtube.com/watch?v=86HOPLCgc00",
        },
        {
            id: 5,
            algo: "quick",
            best_TC: "O(n log n)",
            average_TC: "O(n log n)",
            worst_TC: "O(n^2)",
            best_SC: "O(log n)",
            average_SC: "O(log n)",
            worst_SC: "O(n)",
            description:
                "Quick Sort picks a pivot element and splits the list into two parts—smaller values on one side and larger ones on the other. It keeps repeating this process on each part until everything is sorted. It is very fast for large lists but can slow down if the pivot is not chosen well.",
            sudo_code: `1. Choose a pivot element.
2. Partition the array around the pivot.
3. Recursively sort the sub-arrays.
4. Combine the sorted sub-arrays.
5. Repeat until the entire array is sorted.`,
            reference: "https://www.youtube.com/watch?v=iVj8uyd50f4",
        },
    ];
    const [currentIndices, setCurrentIndices] = useState([]);

    // random value generator
    function valueGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // getValue - random
    function getValues() {
        const initialData = [];
        for (let i = 0; i < 33; i++) {
            initialData.push(valueGenerator(10, 100));
        }
        setData(initialData);
    }

    // Function to handle sorting
    const handleSort = () => {
        if (sortingAlgo === "bubble") {
            (async () => {
                let swapped;
                for (let i = 0; i < data.length - 1; i++) {
                    swapped = false; // Track if any swap happened

                    for (let j = 0; j < data.length - i - 1; j++) {
                        setCurrentIndices([j, j + 1]); // Highlight current and comparing element

                        if (data[j] > data[j + 1]) {
                            [data[j], data[j + 1]] = [data[j + 1], data[j]];
                            setData([...data]);
                            swapped = true; // Mark that a swap happened
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

                        await new Promise((resolve) =>
                            setTimeout(resolve, 500 / speedValue)
                        );

                        data[j + 1] = data[j]; // Shift element
                        setData([...data]);

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

                        if (array[j] < pivot) {
                            i++;
                            if (i !== j) {
                                // Swap only if needed
                                [array[i], array[j]] = [array[j], array[i]];
                                setData([...array]);
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

    // getting random value on load
    useEffect(() => {
        getValues();
    }, []);

    return (
        <div className="flex flex-col gap-2 flex-1 p-2 bg-[#2b2b2a]">
            <div className="choose-alg flex justify-center">
                <div className="flex gap-2 p-2 bg-gray-400 rounded-xl shadow-lg">
                    {["selection", "bubble", "insertion", "merge", "quick"].map(
                        (algo) => (
                            <button
                                key={algo}
                                className={`p-2 px-4 rounded-lg text-white ${
                                    sortingAlgo === algo
                                        ? "bg-blue-500"
                                        : "bg-[#3c3c3a]"
                                } cursor-pointer transition-all duration-100`}
                                onClick={() => setSortingAlgo(algo)}
                            >
                                {algo.charAt(0).toUpperCase() + algo.slice(1)}{" "}
                                Sort
                            </button>
                        )
                    )}
                </div>
            </div>
            <div className="visualization flex flex-col lg:flex-row justify-center w-full gap-2">
                <div className="details w-full flex gap-2 p-2 bg-gray-400 rounded-xl flex-col shadow-lg lg:max-w-1/2">
                    <div className="inputs bg-[#3c3c3b] p-2 rounded-lg text-white flex gap-4 flex-col shadow-md">
                        <p className="flex gap-5 items-center">
                            <span className="text-xl font-bold">
                                Algorithm:{" "}
                            </span>
                            <span className="bg-blue-500 text-white p-2 rounded-md">
                                {sortingAlgo.toUpperCase()} SORT
                            </span>
                        </p>
                        <p className="flex gap-4 items-center">
                            <label htmlFor="data" className="text-xl font-bold">
                                Input data:
                            </label>
                            <input
                                type="text"
                                name="data"
                                id="data"
                                value={data}
                                className="bg-blue-500 text-white p-2 rounded-md flex-1"
                                onChange={(e) => {
                                    const newData = e.target.value
                                        .split(",")
                                        .map(Number);
                                    setData(newData);
                                }}
                            />
                        </p>
                        <p className="flex gap-4 items-center">
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
                                onChange={(e) => setSpeedValue(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className="algo-details bg-[#3c3c3b] p-2 rounded-lg text-white flex flex-col shadow-md">
                        {algoDetails.map((currentAlgo) => {
                            if (currentAlgo.algo === sortingAlgo) {
                                return (
                                    <div key={currentAlgo.id}>
                                        <h3 className="text-xl font-bold">
                                            {currentAlgo.algo
                                                .charAt(0)
                                                .toUpperCase() +
                                                currentAlgo.algo.slice(1)}{" "}
                                            Sort
                                        </h3>
                                        <p className="mt-2">
                                            {currentAlgo.description}
                                        </p>
                                        <div className="mt-4 flex gap-3 justify-center">
                                            <div className="bg-[#282828] p-2 rounded-lg">
                                                <h2 className="text-lg font-semibold">
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
                                            <div className=" bg-[#282828] p-2 rounded-lg">
                                                <h2 className="text-lg font-semibold">
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
                    <div className="algo-details bg-[#3c3c3b] p-2 rounded-lg text-white flex flex-col shadow-md">
                        <h2 className="text-xl font-bold my-2">Pseudocode:</h2>
                        <pre className="bg-[#282828] p-2 rounded-lg overflow-auto">
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
                        <pre className="bg-[#282828] p-2 rounded-lg overflow-auto">
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
                <div className="graph w-full flex gap-2 p-2 bg-gray-400 rounded-xl flex-col flex-1 shadow-lg lg:max-w-3/4">
                    <div className="graph bg-[#3c3c3b] p-2 rounded-lg text-white flex flex-1 shadow-md">
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
                    <div className="controls bg-[#3c3c3b] p-2 rounded-lg text-white flex justify-center shadow-md gap-2">
                        <button
                            className="bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition-all duration-100 cursor-pointer active:bg-blue-500"
                            onClick={() => {
                                getValues();
                            }}
                        >
                            Generate New Array
                        </button>
                        <button
                            className="bg-blue-500 p-2 rounded-md hover:bg-blue-600 transition-all duration-100 cursor-pointer active:bg-blue-500"
                            onClick={() => {
                                handleSort();
                            }}
                        >
                            Start Sorting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlgoVisualizer;
