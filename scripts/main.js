
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
var inp_gen_custom = document.getElementById("a_custom_generate");
var inp_custom = document.getElementById("a_custom"); 
var butts_algos=document.querySelectorAll(".algos button");
var refresh = document.getElementById("refresh");
var div_sizes=[];
var divs=[];
var margin_size;

var cont = document.getElementById("array_container");
cont.style.display = "flex"; // Ensure it's using flexbox
cont.style.flexDirection = "row"; // Make sure it's row-wise


//Array generation and updation.
refresh.onclick = function() {location.reload();};
inp_gen.addEventListener("click",generate_random_array);
inp_gen_custom.addEventListener("click",generate_custom_array);
inp_as.addEventListener("input",update_array_size);

function generate_random_array() {
    cont.innerHTML = ""; // Clear existing array elements
    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        create_div(i, div_sizes[i]);
    }
}


function generate_custom_array() {
    cont.innerHTML = ""; // Clear existing array elements
    let custom_values = inp_custom.value.split(",").map(Number).filter(val => !isNaN(val) && val > 0);

    if (custom_values.length === 0) {
        alert("Please enter a valid array of positive numbers separated by commas.");
        return;
    }

    array_size = custom_values.length;
    inp_as.value = array_size; // Update slider to match custom array size
    div_sizes = custom_values;

    // Scaling factor to make the towers less tall
    const scale_factor = 0.75; // Adjust this value as needed

    for (var i = 0; i < array_size; i++) {
        create_div(i, div_sizes[i] * scale_factor); // Apply the scale factor to the height
    }
}

function create_div(i, size) {
    divs[i] = document.createElement("div");
    cont.appendChild(divs[i]);
    margin_size = 0.1;
    // Inside create_div function, ensure this width calculation is correct
    divs[i].style = `margin: 0% ${margin_size}%; 
    background-color: #e8da5f; 
    width: ${100 / array_size - (2 * margin_size)}%; 
    height: ${size}%; 
    position: relative;`;

    // Create the number element and style it
    var number = document.createElement("span");
    number.textContent = div_sizes[i]; // Set the value of the tower
    number.style.position = "absolute";
    number.style.bottom = "0"; // Position the number at the top of the div
    number.style.left = "50%";
    number.style.transform = "translateX(-50%)"; // Center the number horizontally
    number.style.color = "black";
    number.style.fontSize = "12px"; // Adjust font size as needed


    divs[i].appendChild(number); // Append the number to the tower div
}


function div_update(cont, height, color,new_number) {
    window.setTimeout(function() {
        cont.style = `margin: 0% ${margin_size}%; width: ${100 / array_size - (2 * margin_size)}%; height: ${height}%; background-color: ${color};`;
        console.log(cont,'main');
        
        // Update the number inside the bar (if it exists)
        var number = cont.querySelector("span");
        if (number) {
            number.style.position = "absolute";
            number.style.bottom = "0"; // Position the number at the top of the div
            number.style.left = "50%";
            number.style.transform = "translateX(-50%)";
            number.textContent = new_number; // Update the number text with the new value
        }
    }, c_delay += delay_time);
}

function update_array_size() {
    array_size = inp_as.value;
    if (inp_custom.value.trim() !== ""){
        generate_custom_array();
    }
    else{
        generate_random_array();
    }
}


window.onload=update_array_size();

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();

    this.classList.add("butt_selected");
    switch(this.innerHTML)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
        case "Counting":CountingSort();
                        break;
        case "Tim":Timsort();
                        break;
    }

    
}
