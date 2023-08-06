let h11 = document.getElementById("h11");
let h12 = document.getElementById("h12");
// let h13 = document.getElementById("h13");
// let h14 = document.getElementById("h14");
// let h15 = document.getElementById("h15");
// let h16 = document.getElementById("h16");
let count = 0;



let initBtn = document.getElementById("init");
initBtn.addEventListener('click', initFunc);

function initFunc()
{
    // some code
}

let mouseOnTimer;
let focusTimer;
let mouseZtimer;
let keyholdtimer;
let longpresstimer; 

function mouseover()
{
    clearTimeout(mouseOnTimer);
    h11.innerHTML = 'mouseover';
    mouseOnTimer = setTimeout(()=>{h11.innerHTML='h11'},1500);
}

function mouseout()
{
    clearTimeout(mouseOnTimer);
    h11.innerHTML = 'mouseout';
    mouseOnTimer = setTimeout(()=>{h11.innerHTML='h11'},1500);
}

function focus()
{
    clearTimeout(focusTimer);
    h12.innerHTML = 'focus';
    focusTimer = setTimeout(()=>{h12.innerHTML='h12'},1500);
}
function blur()
{
    clearTimeout(focusTimer);
    h12.innerHTML = 'blur';
    focusTimer = setTimeout(()=>{h12.innerHTML='h12'},1500);
}

function mousedown()
{
    clearTimeout(mouseZtimer);
    h13.innerHTML = 'mousedown';
    mouseZtimer = setTimeout(()=>{h13.innerHTML='h13'},1500);
    longpresstimer = setTimeout(longpress, 500);
}

function mouseup()
{
    clearTimeout(mouseZtimer);
    clearTimeout(longpresstimer);
    h13.innerHTML = 'mouseup';
    mouseZtimer = setTimeout(()=>{h13.innerHTML='h13'},1500);
}

function longpress()
{
    h14.innerHTML = 'longpress';
    setTimeout(()=>{h14.innerHTML='h14'},1500);
}

function keydown()
{
    clearTimeout(keyholdtimer);
    h15.innerHTML = 'keydown';
    keyholdtimer = setTimeout(()=>{h15.innerHTML='h15'},1500);
}

function keyup()
{
    clearTimeout(keyholdtimer);
    h15.innerHTML = 'keyup';
    keyholdtimer = setTimeout(()=>{h15.innerHTML='h15'},1500);
}
// let b1 = document.getElementById("btn1");
// let b2 = document.getElementById("btn2");

// b1.addEventListener("click", f1);
// b2.addEventListener("click", f2);



