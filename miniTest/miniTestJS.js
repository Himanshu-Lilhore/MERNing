let count = 0;
let tt = document.getElementById("tit");
let h1disp = document.getElementById("display");
let pp

async function f1(){
    setTimeout(()=>{}, 3000)
    console.log("1")
}

async function asyncCall(){
    await f1();
    console.log("2")
}

function displayFunc()
{
    // put your output into pp vaiable
    console.log("3") 
    asyncCall()
    .then(()=>{
        console.log("4") 
        let pp = 'finish'
        // test end here
        h1disp.innerHTML = pp
    }
    )
    
}


let bb = document.getElementById("btn");
bb.addEventListener("click", displayFunc);