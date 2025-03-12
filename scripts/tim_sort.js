function Timsort() {
    // Setting Time Complexities
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N)";

    // Setting Space Complexity
    document.getElementById("Space_Worst").innerText = "O(N)";

    c_delay = 0;

    // Define the run size (standard value is 32)
    const RUN = 32;

    // Step 1: Sort small runs using Insertion Sort
    for (let i = 0; i < array_size; i += RUN) {
        insertionSortRun(i, Math.min((i + RUN - 1), array_size - 1));
    }

    // Step 2: Merge sorted runs using Merge Sort
    for (let size = RUN; size < array_size; size = 2 * size) {
        for (let left = 0; left < array_size; left += 2 * size) {
            const mid = Math.min((left + size - 1), array_size - 1);
            const right = Math.min((left + 2 * size - 1), array_size - 1);

            if (mid < right) {
                mergeRuns(left, mid, right);
            }
        }
    }

    enable_buttons();
}

// Insertion Sort for a run
function insertionSortRun(left, right) {
    for (let i = left + 1; i <= right; i++) {
        let temp = div_sizes[i];
        let j = i - 1;

        // Visualization: Highlight the element being sorted
        div_update(divs[i], div_sizes[i], "yellow", div_sizes[i]);

        while (j >= left && div_sizes[j] > temp) {
            div_update(divs[j], div_sizes[j], "red", div_sizes[j]); // Comparison
            div_sizes[j + 1] = div_sizes[j];
            div_update(divs[j + 1], div_sizes[j + 1], "red", div_sizes[j+1]); // Update

            j--;
        }
        div_sizes[j + 1] = temp;

        // Visualization: Mark sorted elements
        for (let k = left; k <= i; k++) {
            div_update(divs[k], div_sizes[k], "green", div_sizes[k]);
        }
    }
}

// Merge sorted runs
function mergeRuns(left, mid, right) {
    const len1 = mid - left + 1;
    const len2 = right - mid;
    const leftArr = new Array(len1);
    const rightArr = new Array(len2);

    for (let i = 0; i < len1; i++) {
        leftArr[i] = div_sizes[left + i];
        div_update(divs[left + i], div_sizes[left + i], "yellow", div_sizes[left+i]); // Highlight left part
    }
    for (let i = 0; i < len2; i++) {
        rightArr[i] = div_sizes[mid + 1 + i];
        div_update(divs[mid + 1 + i], div_sizes[mid + 1 + i], "yellow", div_sizes[mid+1+i]); // Highlight right part
    }

    let i = 0, j = 0, k = left;

    while (i < len1 && j < len2) {
        if (leftArr[i] <= rightArr[j]) {
            div_sizes[k] = leftArr[i];
            div_update(divs[k], div_sizes[k], "green", div_sizes[k]); // Merge step
            i++;
        } else {
            div_sizes[k] = rightArr[j];
            div_update(divs[k], div_sizes[k], "green", div_sizes[k]); // Merge step
            j++;
        }
        k++;
    }

    while (i < len1) {
        div_sizes[k] = leftArr[i];
        div_update(divs[k], div_sizes[k], "green", div_sizes[k]); // Merge step
        i++;
        k++;
    }

    while (j < len2) {
        div_sizes[k] = rightArr[j];
        div_update(divs[k], div_sizes[k], "green", div_sizes[k]); // Merge step
        j++;
        k++;
    }
}
