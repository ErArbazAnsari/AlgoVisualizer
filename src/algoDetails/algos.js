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
        sudo_code: `1. Start from the first element of the array.  
2. Compare it with the next element.  
3. If the first element is greater, swap them.  
4. Move to the next pair and repeat the comparison and swap if needed.  
5. Continue this process until the largest element moves to the end.  
6. Repeat the entire process for the remaining unsorted elements, ignoring
   the last sorted elements.  
7. Stop when no swaps are needed, meaning the array is fully sorted.`,
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
        sudo_code: `1. Start from the first element and assume it is the smallest.  
2. Look through the remaining elements to find the smallest value.  
3. If a smaller value is found, remember its position.  
4. Swap the smallest value found with the current element.  
5. Move to the next element and repeat the process for the rest of the array.  
6. Continue this until the second-to-last element (the last element will be 
   automatically sorted).
7. The array is now sorted in ascending order.`,
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
        sudo_code: `1. Start from the second element, considering the first as already sorted.  
2. Pick the current element as the key for comparison and insertion.  
3. Compare the key with elements in the sorted part of the array.  
4. Shift all larger elements one position to the right.  
5. Place the key in its correct position within the sorted section.  
6. Move to the next element and repeat the process iteratively.  
7. Continue until all elements are placed in the correct order.  
8. The array is now fully sorted in ascending order.`,
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
        sudo_code: `1. If the array has one element, it is already sorted.  
2. Divide the array into two equal or nearly equal halves.  
3. Recursively split both halves until single elements remain.  
4. Start merging by comparing elements from both halves.  
5. Place the smaller element into a new sorted array.  
6. Repeat the process until one half is fully merged.  
7. Append any remaining elements from the non-empty half.  
8. The array is now fully sorted after all merges complete.`,
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
        sudo_code: `1. If the array has one or no elements, it is already sorted.  
2. Select a pivot element from the array (commonly first or last).  
3. Partition the array by placing smaller elements to the left.  
4. Place larger elements to the right of the pivot.  
5. The pivot is now in its correct sorted position.  
6. Recursively apply quick sort on the left partition.  
7. Recursively apply quick sort on the right partition.  
8. The array is fully sorted when all partitions are processed.`,
        reference: "https://www.youtube.com/watch?v=iVj8uyd50f4",
    },
];
