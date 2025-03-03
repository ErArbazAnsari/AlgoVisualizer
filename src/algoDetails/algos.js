export const algoDetails = [
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
            "Selection Sort is a simple sorting algorithm that repeatedly finds the smallest element from the unsorted part of the list and swaps it with the first unsorted element. This process continues until the entire list is sorted. It is easy to understand and implement but is inefficient for large datasets due to its repetitive scanning of the list. It works well for small lists or when memory usage is a concern.",
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
