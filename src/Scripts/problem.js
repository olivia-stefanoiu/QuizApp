const urlSearchParams = new URLSearchParams(window.location.search);

const currentCategory = urlSearchParams.get("category");
let currentNumber = parseInt(urlSearchParams.get("nr"));
const problemId = urlSearchParams.get("problemId");
console.log(problemId)

async function loadProblem(currentNumber) {//shadows main variable
    //vezi cum faci sa nu se strice la 0 si ==answer
    document.getElementById("answer").innerHTML = ''
    document.getElementById("problemSpace").innerHTML = ''
//console.log(problems[currentCategory][currentNumber].answers)
    for (let a = 0; a < problems[currentCategory][currentNumber].answers.length; a++) {

        const el = document.createElement("button")
        el.id = "answers" + a
        el.className = "button-8 width-1000 answers"
        document.getElementById("answer").appendChild(el);

        for (let i = 0; i < problems[currentCategory][currentNumber].answers[a].length; i++) {
            if (i % 2 === 0) {
                const ans = document.createElement("span")
                ans.innerHTML = problems[currentCategory][currentNumber].answers[a][i];
                document.getElementById("answers" + a).appendChild(ans);
            } else {
                const ans = document.createElement("math-field")
                ans.className = "math-field"
                ans.contentEditable = "false"
                ans.setValue(problems[currentCategory][currentNumber].answers[a][i],
                    {suppressChangeNotifications: true});
                document.getElementById("answers" + a).appendChild(ans);
            }
        }
    }
    // document.getElementById("problemSpace").innerHTML = problems[currentCategory][currentNumber].name + problems[currentCategory][currentNumber].questiontext;
    for (let i = 0; i < problems[currentCategory][currentNumber].questiontext.length; i++) {
        if (i === 0) {
            const el = document.createElement("span")
            el.innerHTML = problems[currentCategory][currentNumber].name + problems[currentCategory][currentNumber].questiontext[i];
            document.getElementById("problemSpace").appendChild(el);
        } else if (i % 2 === 0) {
            const el = document.createElement("span")
            el.innerHTML = problems[currentCategory][currentNumber].questiontext[i]
            document.getElementById("problemSpace").appendChild(el);
        } else {
            const el = document.createElement("math-field")
            el.className = "math-field"
            el.contentEditable = "false"
            el.setValue(problems[currentCategory][currentNumber].questiontext[i],
                {suppressChangeNotifications: true});
            document.getElementById("problemSpace").appendChild(el);
        }

    }
    // const done = await window.electronAPI.getDone(problems[currentCategory][currentNumber].id);
    // if (done === true) {
    //     document.getElementById("problemSpace").style.background = "#a9e59f";
    // } else if (done === "false") {
    //     document.getElementById("problemSpace").style.background = "#e59f9f";
    // } else {
    //     document.getElementById("problemSpace").style.background = "#c9c9f5";
    // }

    document.querySelectorAll(".answers").forEach(item => {
        item.addEventListener('click', event => {
            checkAnswer(item.id)
        })
    })

}

function displayAnswer() {

    if (document.getElementById("raspuns").childElementCount === 0) {
        const divAnswer = document.createElement('div');
        divAnswer.id = "divAnswer";
        divAnswer.className = "div-answer";
        document.getElementById("raspuns").appendChild(divAnswer);

        for (let i = 0; i < problems[currentCategory][currentNumber].raspuns.length; i++) {
            if (i % 2 === 0) {
                const el = document.createElement("span")
                el.innerHTML = problems[currentCategory][currentNumber].raspuns[i]
                document.getElementById("divAnswer").appendChild(el);
            } else {
                const el = document.createElement("math-field")
                el.className = "math-field"
                el.contentEditable = "false"
                el.setValue(problems[currentCategory][currentNumber].raspuns[i],
                    {suppressChangeNotifications: true});
                document.getElementById("divAnswer").appendChild(el);
            }

        }
    }
    else if(document.getElementById("divAnswer").style.display==="block"){
        document.getElementById("divAnswer").style.display="none";
    }
    else{
        document.getElementById("divAnswer").style.display="block";
    }
}

function toggleButton() {
    document.getElementById("answerButton").style.visibility = "visible";
    document.getElementById("answerButton").style.display = "block";
}

async function checkAnswer(answerId) {

    if (problems[currentCategory][currentNumber].correctAnswer[answerId[answerId.length - 1]] === '100') {
        document.getElementById(answerId).style.background = "#a9e59f";
        await window.electronAPI.setDone(problems[currentCategory][currentNumber].id, true)
        await window.electronAPI.setDone(problemId, true)
        toggleButton();
    } else {
        document.getElementById(answerId).style.background = "#e59f9f";
        await window.electronAPI.setDone(problems[currentCategory][currentNumber].id, false)
        await window.electronAPI.setDone(problemId, "false")

    }

}

document.getElementById("previous").addEventListener("click", event => loadProblem(--currentNumber));
document.getElementById("next").addEventListener("click", event => loadProblem(++currentNumber));
document.getElementById("answerButton").addEventListener("click", event => displayAnswer());


getXml().then(() => loadProblem(currentNumber));
// styleMf()