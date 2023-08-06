let count = 0;
let tt = document.getElementById("tit");
let h1disp = document.getElementById("display");
let pp;
function displayFunc()
{
    // put your output into pp vaiable
    let dicc = {one:1, 'two':2, 'three':3};
    let pp = Object.keys(dicc).length;
    // test end here
    h1disp.innerHTML = pp;
}



let bb = document.getElementById("btn");
bb.addEventListener("click", displayFunc);