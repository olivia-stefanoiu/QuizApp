const urlSearchParams = new URLSearchParams(window.location.search);

const currentCategory = urlSearchParams.get("category");
let currentNumber = parseInt(urlSearchParams.get("nr"));

//const mf = document.getElementById('problemSpace');

function styleMf(){
    const styleEl = document.createElement("style")
    styleEl.innerHTML = ".ML__base{\n" +
        "    display: flex;\n" +
        "    flex-wrap: wrap;\n" +
        "    width: 950px;\n" +
        "}"

    document.querySelector("#problemSpace").shadowRoot.appendChild(styleEl)
}



async function loadProblem(currentNumber) {//shadows main variable

    for(let a=0;a<problems[currentCategory][currentNumber].answers.length;a++){

        const el = document.createElement("button")
        el.className = "button-8 width-1000"
        el.innerHTML=problems[currentCategory][currentNumber].answers[a].text;
        document.getElementById("answer").appendChild(el);

    }


    // document.getElementById("problemSpace").innerHTML = problems[currentCategory][currentNumber].name + problems[currentCategory][currentNumber].questiontext;
    console.log(problems[currentCategory][currentNumber].name + problems[currentCategory][currentNumber].questiontext)

    document.getElementById("problemSpace").setValue(
        problems[currentCategory][currentNumber].name + problems[currentCategory][currentNumber].questiontext,
        {suppressChangeNotifications: true});


       // answer = problems[currentCategory][currentNumber].answer;


        if(await window.electronAPI.getDone(problems[currentCategory][currentNumber].id)===true) {
            document.getElementById("problemSpace").style.background = "#a9e59f";
        }
        else if(await window.electronAPI.getDone(problems[currentCategory][currentNumber].id)==="false"){
            document.getElementById("problemSpace").style.background = "#e59f9f";
            }
        else{
            document.getElementById("problemSpace").style.background = "#c9c9f5";
        }

    }

function displayAnswer(){


    const divAnswer = document.createElement('div');
    divAnswer.id = "div-answer";
    divAnswer.className ="div-answer";

    document.getElementById("answer").appendChild(divAnswer);

}
/*
function insertSymbol(target) {
    let append = target.getAttribute("data-latex");//string de latex stocat pe buton
    mf.setValue(mf.value + append, {suppressChangeNotifications: true});

}
*/

function toggleButton(){
    document.getElementById("answerButton").style.visibility = "visible";
    document.getElementById("answerButton").style.display = "block";
}

function checkEnter(ev) {
    if (ev.code === "Enter") {
        checkAnswer(ev.target.code);
        toggleButton();
    }
}

/*
function checkAnswer() {

    if (mf.value === answer) {
        document.getElementById("problemSpace").style.background = "#a9e59f";
        window.electronAPI.setDone(problems[currentCategory][currentNumber].id, true)
    } else {
        document.getElementById("problemSpace").style.background = "#e59f9f";
        window.electronAPI.setDone(problems[currentCategory][currentNumber].id, "false");
    }

}
*/

/*
window.onload = function () {
    const keyboardToggle = document.querySelector("#formula").shadowRoot.querySelector(".ML__virtual-keyboard-toggle")
    if (keyboardToggle) {
        keyboardToggle.style.display = "block"
        keyboardToggle.style.marginLeft = "16px"
    }
}
*/

document.querySelectorAll("symbol").forEach(inputEl => {
    inputEl.addEventListener("click", event => insertSymbol(event.target))
})

//mf.addEventListener("keyup", checkEnter);

document.getElementById("previous").addEventListener("click", event => loadProblem(--currentNumber));
document.getElementById("next").addEventListener("click", event => loadProblem(++currentNumber));
document.getElementById("answerButton").addEventListener("click", event => displayAnswer());

getXml().then(()=>loadProblem(currentNumber));
styleMf()