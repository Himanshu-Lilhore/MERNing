
let b1 = document.getElementById("btn1");
let d1 = document.getElementById("holder");
b1.addEventListener("click", initFuncAlt);
let count = 1;



let initBtn = document.getElementById("init");
initBtn.addEventListener('click', initFunc);
b1.innerHTML = 'Add h1 using innerHTML property';
initBtn.innerHTML = 'Add h1 using appendChild method';

let b2 = document.createElement('button');
b2.innerHTML = 'Reset the div';
document.body.insertBefore(b2,d1);
b2.addEventListener('click', reset);

function initFunc()
{
    let newChild = document.createElement('h1');
    newChild.innerHTML = count++;
    newChild.setAttribute('class', 'by-append');
    newChild.classList.add('by-append');
    d1.appendChild(newChild);
}

function initFuncAlt()
{
    d1.innerHTML += '<h1 class="by-inner">' + count++ + '</h1>';
}

function reset(){
    d1.innerHTML = '';
    count = 1;
}



