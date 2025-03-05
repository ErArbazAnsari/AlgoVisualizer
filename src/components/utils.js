export const valueGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getValues = (arraySize, setData) => {
    const initialData = [];
    for (let i = 0; i < arraySize; i++) {
        initialData.push(valueGenerator(10, 100));
    }
    setData(initialData);
};
