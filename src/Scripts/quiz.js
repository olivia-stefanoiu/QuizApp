const urlSearchParams = new URLSearchParams(window.location.search);

const currentValueTime = urlSearchParams.get("time");
const currentValueNumber = urlSearchParams.get("number");
const currentValueChapter = urlSearchParams.get("chapters").split(',');

let quizProblems = []
let problemNumber = 0
let problemId = ""
let nrProblemeRezolvate = 0

function updateTimer() {
    const timer = document.getElementById("timer");

    timer.innerHTML = (Number.parseInt(timer.innerHTML) - 1).toString();

    if (Number.parseInt(timer.innerHTML) === 0) {
        clearInterval(intervalValue);
        timer.innerHTML = "Timpul a expirat";
        const min = document.getElementById("min");
        min.innerHTML = "";
    }
}

function setTime() {
    if (currentValueTime === "0") {
        document.getElementById("timer").innerHTML = "";
        document.getElementById("min").innerHTML = "";
    } else {
        document.getElementById("timer").innerHTML = currentValueTime;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function checkAnswer(answerId, currentCategory, currentNumber) {
    problemId = "Problema " + currentNumber + currentCategory;

    if (problems[currentCategory][currentNumber].correctAnswer[answerId[answerId.length - 1]] === '100') {
        document.getElementById(answerId).style.background = "#a9e59f";
        await window.setDone(problems[currentCategory][currentNumber].id, true)
        await window.setDone(problemId, true)
        console.log("WOLOLOLOLO")
        nrProblemeRezolvate++
    } else {
        document.getElementById(answerId).style.background = "#e59f9f";
        await window.setDone(problems[currentCategory][currentNumber].id, false)
        await window.setDone(problemId, "false")
        console.log("NUUNUNUNU")
    }

    document.querySelectorAll(".answers").forEach(item => {
       item.disabled = true
    })

    if (problemNumber - 1 === currentValueNumber - 1) {

        changeButtonURL()
    }
}

async function loadProblem() {//shadows main variable

    let currentCategory = (quizProblems[problemNumber].split(","))[0]
    let currentNumber = (quizProblems[problemNumber].split(","))[1]

    problemNumber++;

    document.getElementById("answer").innerHTML = ''
    document.getElementById("problemSpace").innerHTML = ''

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


    document.querySelectorAll(".answers").forEach(item => {
        item.addEventListener('click', event => {
            checkAnswer(item.id, currentCategory, currentNumber)
        })
    })
}


function generateProblemSet() {
    console.log(problems)
    for (i = 0; i < currentValueNumber; i++) {
        let nrcat = getRandomInt(currentValueChapter.length)
        let categ = currentValueChapter[nrcat]
        let nrprob = getRandomInt(problems[categ].length)

        quizProblems.push(categ.toString() + "," + nrprob.toString())
    }
    console.log(quizProblems)
    let currentCategory = (quizProblems[problemNumber].split(","))[0]
    let currentNumber = (quizProblems[problemNumber].split(","))[1]

    loadProblem()
}

function changeButtonText() {

    let button = document.getElementById("nextProblem")
    button.innerHTML = "Results"
}

function changeButtonURL() {

    let button = document.getElementById("nextProblem")
    button.href = "quiz-result.html?"
        + "&nrProbleme=" +  // make the strings constants
        currentValueNumber
        + "&nrProblemeRezolvate=" +
        nrProblemeRezolvate;

    console.log(button.href)
}

// document.getElementById("nextProblem").addEventListener("click", event => loadProblem());
document.getElementById("nextProblem").addEventListener("click", event => {
    if (problemNumber === currentValueNumber - 1) {
        event.preventDefault() // a element is retarded
        changeButtonText()
    }

    loadProblem()
});
getXml().then(() => generateProblemSet())
window.addEventListener("load", setTime);
let intervalValue = setInterval(updateTimer, 1000);

