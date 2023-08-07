let h11 = document.getElementById("h11");

let count = 0;
function outerFunction() 
{
    function plusOne() 
    {
        count++;
        return count;
    }
    function minusOne() 
    {
        count--;
        return count;
    }
    function reset()
    {
        count=0;
    }
    return {
        plusOne:plusOne,
        minusOne:minusOne,
        reset:reset
    }
};

const innerFuncs = outerFunction();


let initBtn = document.getElementById("init");
initBtn.addEventListener('click', initFunc);

function initFunc()
{
    h11.innerHTML = count;
    for(let i=0; i<Object.keys(innerFuncs).length; i++)
    {
        let btemp = document.createElement("BUTTON");
        btemp.textContent = Object.keys(innerFuncs)[i];
        document.body.appendChild(btemp);
        
        function ftemp()
        {
            innerFuncs[Object.keys(innerFuncs)[i]]();
            h11.innerHTML = count;
        }
        btemp.addEventListener("click", ftemp);
    }

}
