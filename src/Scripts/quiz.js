const currentValueTime = urlSearchParams.get("time");
const currentValueNumber = urlSearchParams.get("number");
const currentValueChapter = urlSearchParams.get("chapters");


function updateTimer() {
    const timer = document.getElementById("timer");
    timer.innerHTML = (Number.parseInt(timer.innerHTML) - 1).toString();
    if (Number.parseInt(timer.innerHTML) === 0) {
        clearInterval(intervalValue);
        timer.innerHTML = "Timpul a expirat";
        const min = document.getElementById("min");
        min.innerHTML = "";
        document.getElementById("formula").disabled = true;

    }
}

function setTime() {
    if(currentValueTime==="0"){
        document.getElementById("timer").innerHTML = "";
        document.getElementById("min").innerHTML="";
    }
    else {
        document.getElementById("timer").innerHTML = currentValueTime;
    }
}


if (Number.parseInt(currentValueTime) !== 0) {
    let intervalValue = setInterval(updateTimer, 1000);
}
window.addEventListener("load", setTime);