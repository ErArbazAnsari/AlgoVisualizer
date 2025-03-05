export const sortingFunctions = {
    bubble: async (
        data,
        setData,
        setCurrentIndices,
        speedValue,
        stopSorting,
        playNote
    ) => {
        let swapped;
        for (let i = 0; i < data.length - 1; i++) {
            if (stopSorting) break;
            swapped = false;
            for (let j = 0; j < data.length - i - 1; j++) {
                if (stopSorting) break;
                setCurrentIndices([j, j + 1]);
                playNote(440);

                if (data[j] > data[j + 1]) {
                    [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    setData([...data]);
                    swapped = true;
                    playNote(523.25);
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, 500 / speedValue)
                );
                setCurrentIndices([]);
            }
            if (!swapped) break;
        }
    },
    selection: async (
        data,
        setData,
        setCurrentIndices,
        speedValue,
        stopSorting,
        playNote
    ) => {
        for (let i = 0; i < data.length - 1; i++) {
            if (stopSorting) break;
            let minIndex = i;
            for (let j = i + 1; j < data.length; j++) {
                if (stopSorting) break;
                setCurrentIndices([minIndex, j]);
                playNote(440);

                if (data[j] < data[minIndex]) {
                    minIndex = j;
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, 500 / speedValue)
                );
            }

            if (minIndex !== i) {
                [data[i], data[minIndex]] = [data[minIndex], data[i]];
                setData([...data]);
                playNote(523.25);
            }

            setCurrentIndices([]);
        }
    },
    insertion: async (
        data,
        setData,
        setCurrentIndices,
        speedValue,
        stopSorting,
        playNote
    ) => {
        for (let i = 1; i < data.length; i++) {
            if (stopSorting) break;
            let key = data[i];
            let j = i - 1;
            setCurrentIndices([i]);

            while (j >= 0 && data[j] > key) {
                if (stopSorting) break;
                setCurrentIndices([j, j + 1]);
                playNote(440);

                await new Promise((resolve) =>
                    setTimeout(resolve, 500 / speedValue)
                );

                data[j + 1] = data[j];
                setData([...data]);
                playNote(523.25);
                j--;
            }

            data[j + 1] = key;
            setData([...data]);
            setCurrentIndices([]);
        }
    },
    merge: async (
        data,
        setData,
        setCurrentIndices,
        speedValue,
        stopSorting,
        playNote
    ) => {
        const merge = async (array, start, mid, end) => {
            const leftArray = array.slice(start, mid + 1);
            const rightArray = array.slice(mid + 1, end + 1);
            let i = 0,
                j = 0,
                k = start;

            while (i < leftArray.length && j < rightArray.length) {
                if (stopSorting) break;
                setCurrentIndices([k, mid + j + 1]);
                playNote(440);

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
                setCurrentIndices([]);
                k++;
            }

            while (i < leftArray.length) {
                if (stopSorting) break;
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
                if (stopSorting) break;
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

        const mergeSortHelper = async (array, start, end) => {
            if (start < end) {
                const mid = Math.floor((start + end) / 2);
                await mergeSortHelper(array, start, mid);
                await mergeSortHelper(array, mid + 1, end);
                await merge(array, start, mid, end);
            }
        };

        await mergeSortHelper(data, 0, data.length - 1);
    },
    quick: async (
        data,
        setData,
        setCurrentIndices,
        speedValue,
        stopSorting,
        playNote
    ) => {
        const partition = async (array, low, high) => {
            const pivot = array[high];
            let i = low;

            for (let j = low; j < high; j++) {
                if (stopSorting) break;
                setCurrentIndices([j, high]);
                playNote(440);

                if (array[j] < pivot) {
                    [array[i], array[j]] = [array[j], array[i]];
                    setData([...array]);
                    i++;
                    playNote(523.25);
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, 500 / speedValue)
                );
            }

            [array[i], array[high]] = [array[high], array[i]];
            setData([...array]);
            playNote(523.25);
            setCurrentIndices([]);
            return i;
        };

        const quickSortHelper = async (array, low, high) => {
            if (low < high) {
                const pi = await partition(array, low, high);
                await quickSortHelper(array, low, pi - 1);
                await quickSortHelper(array, pi + 1, high);
            }
        };

        await quickSortHelper(data, 0, data.length - 1);
    },
};
