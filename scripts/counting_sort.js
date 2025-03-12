function CountingSort() {
    // Setting Time Complexities
    document.getElementById("Time_Worst").innerText = "O(N + K)";
    document.getElementById("Time_Average").innerText = "Θ(N + K)";
    document.getElementById("Time_Best").innerText = "Ω(N + K)";

    // Setting Space Complexity
    document.getElementById("Space_Worst").innerText = "O(N + K)";

    c_delay = 0;

    // Find the maximum element to determine the range
    let max_val = Math.max(...div_sizes);
    let count = new Array(max_val + 1).fill(0);

    // Count the occurrences of each element
    for (let i = 0; i < array_size; i++) {
        div_update(divs[i], div_sizes[i], "yellow", div_sizes[i]); // Color update
        count[div_sizes[i]]++;
    }

    // Update the count array to store cumulative counts
    for (let i = 1; i <= max_val; i++) {
        count[i] += count[i - 1];
    }

    // Create an output array to store sorted elements
    let output = new Array(array_size).fill(0);

    for (let i = array_size - 1; i >= 0; i--) {
        output[count[div_sizes[i]] - 1] = div_sizes[i];
        count[div_sizes[i]]--;
    }

    // Copy the sorted elements back to the div_sizes array
    for (let i = 0; i < array_size; i++) {
        div_sizes[i] = output[i];
        div_update(divs[i], div_sizes[i], "green", div_sizes[i]); // Color update to green
    }

    enable_buttons();
}
