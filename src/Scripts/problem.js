const urlSearchParams = new URLSearchParams(window.location.search);
const currentValueName = urlSearchParams.get("problemName");

const mf = document.getElementById('formula');
let answer = "";


function loadProblem() {
    document.getElementById("problemSpace").innerHTML = currentValueName + ".   "
        + (mapProblems.get(currentValueName)).enunt;
    answer = (mapProblems.get(currentValueName)).solutie;
}


function insertSymbol(target) {
    let append = target.getAttribute("data-latex");//string de latex stocat pe buton
    mf.setValue(mf.value + append, {suppressChangeNotifications: true});

}

function checkEnter(ev) {
    if (ev.code === "Enter") {
        checkAnswer(ev.target.code);
    }
}

function checkAnswer() {

    if (mf.value === answer) {
        document.getElementById("problemSpace").style.background = "#a9e59f";
        window.electronAPI.setDone(currentValueName, true)
    } else {
        document.getElementById("problemSpace").style.background = "#e59f9f";
        window.electronAPI.setDone(currentValueName, "false");
    }

}


window.onload = function () {
    const keyboardToggle = document.querySelector("#formula").shadowRoot.querySelector(".ML__virtual-keyboard-toggle")
    if (keyboardToggle) {
        keyboardToggle.style.display = "block"
        keyboardToggle.style.marginLeft = "16px"
    }
}


document.querySelectorAll("button ").forEach(inputEl => {
    inputEl.addEventListener("click", event => insertSymbol(event.target))
})

mf.addEventListener("keyup", checkEnter);

loadProblem();


