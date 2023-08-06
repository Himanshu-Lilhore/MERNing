let h11 = document.getElementById("h11");
let h12 = document.getElementById("h12");
let h13 = document.getElementById("h13");
let h14 = document.getElementById("h14");
let h15 = document.getElementById("h15");
let h16 = document.getElementById("h16");
let count = 0;



let initBtn = document.getElementById("init");
initBtn.addEventListener('click', initFunc);

async function asyncTest(){
    setTimeout(()=>{h11.innerHTML = 'change@1'}, 6000);
    setTimeout(()=>{h12.innerHTML = 'change@2'}, 5000);
    setTimeout(()=>{h13.innerHTML = 'change@3'}, 4000);
    setTimeout(()=>{h14.innerHTML = 'change@4'}, 3000);
    setTimeout(()=>{h15.innerHTML = 'change@5'}, 2000);
    setTimeout(()=>{h16.innerHTML = 'change@6'}, 1000);
}

asyncTest();

function initFunc()
{
    location.reload();
};

// let b1 = document.getElementById("btn1");
// let b2 = document.getElementById("btn2");

// b1.addEventListener("click", f1);
// b2.addEventListener("click", f2);



