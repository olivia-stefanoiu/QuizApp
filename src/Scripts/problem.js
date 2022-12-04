// import "mathlive";
const mf = document.getElementById('formula');


function insertSymbol(target) {
    let append = target.getAttribute("data-latex");
    mf.setValue(mf.value + append, {suppressChangeNotifications: true});

}

function checkEnter(ev) {
    if (ev.code === "Enter") {
        checkAnswer(ev.target.code);
    }
}

function checkAnswer() {
    if (mf.value === "1") {
        document.getElementById("problemSpace").style.background = "#a9e59f";
        window.electronAPI.setDone("Problema 1", true)
    } else {
        document.getElementById("problemSpace").style.background = "#e59f9f";
        window.electronAPI.setDone("Problema 1", false);
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




