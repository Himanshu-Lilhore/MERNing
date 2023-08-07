var count = 0;
var bb = document.getElementById("btn");
bb.addEventListener("click", myFunc);
var tt = document.getElementById("tit");
function myFunc()
{
    tt.innerHTML = count++;
    history.pushState({}, null, count);
}