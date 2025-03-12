function Bubble()
{
    // Setting complexities
    document.getElementById("Time_Best").innerText="Ω(N)";
    document.getElementById("Time_Average").innerText="Θ(N^2)";
    document.getElementById("Time_Worst").innerText="O(N^2)";
    document.getElementById("Space_Worst").innerText="O(1)";

    c_delay=0;

    for(var i=0;i<array_size-1;i++)
    {
        for(var j=0;j<array_size-i-1;j++)
        {
            div_update(divs[j],div_sizes[j],"yellow",div_sizes[j]); //Color update

            if(div_sizes[j]>div_sizes[j+1])
            {
                div_update(divs[j],div_sizes[j], "red",div_sizes[j]);  //Color update
                div_update(divs[j+1],div_sizes[j+1], "red",div_sizes[j+1]); //Color update

                var temp=div_sizes[j];
                div_sizes[j]=div_sizes[j+1];
                div_sizes[j+1]=temp;

                div_update(divs[j],div_sizes[j], "red",div_sizes[j]);//Height update
                div_update(divs[j+1],div_sizes[j+1], "red",div_sizes[j+1]);//Height update
            }
            div_update(divs[j],div_sizes[j], "blue",div_sizes[j]);//Color updat
        }
        div_update(divs[j],div_sizes[j], "green",div_sizes[j]);//Color update
    }
    div_update(divs[0],div_sizes[0], "green",div_sizes[0]);//Color update

    enable_buttons();
}