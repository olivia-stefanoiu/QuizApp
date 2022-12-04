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
    } else {
        document.getElementById("problemSpace").style.background = "#e59f9f";
    }
    // const isDone = true;
    // storage.set(problemName, isDone);
}



document.querySelectorAll("button ").forEach(inputEl => {
    inputEl.addEventListener("click", event => insertSymbol(event.target))
})

mf.addEventListener("keyup", checkEnter);




