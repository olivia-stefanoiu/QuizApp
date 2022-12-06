let currentValueTime = 0;
let currentValueNumber = 0;
let currentValueChapter = [0,0,0,0,0];



async function loadPreferences() {

    //get the preferences form local
    console.log(typeof (await window.electronAPI.getDone("time")));
    if(await window.electronAPI.getDone("time")!=="") {
        currentValueTime = document.getElementById(await window.electronAPI.getDone("time")).value;
    }
    if(await window.electronAPI.getDone("number")!=="") {
        currentValueNumber = document.getElementById(await window.electronAPI.getDone("number")).value;
    }
    if(await window.electronAPI.getDone("chapters")!=="") {
        currentValueChapter = await window.electronAPI.getDone("chapters");
    }

   //check the boxes
    if(currentValueTime!==0) {
        document.getElementById(await window.electronAPI.getDone("time")).checked = true;
    }
    if(currentValueNumber!==0) {
        document.getElementById(await window.electronAPI.getDone("number")).checked = true;
    }
    if(currentValueChapter!==[0,0,0,0,0]) {//look into
        for (let i = 1; i <= 3; i++) {
            console.log(currentValueChapter[i])
            if (currentValueChapter[i]) {
                document.getElementById("categ" + i.toString()).checked = true;
            }
        }
    }

   generateHref();

}

function handleClickTime(time) {
    if (time.checked) {
        currentValueTime = time.value;//value variabila introdusa de noi
        window.electronAPI.setDone("time", time.id)
    }
    generateHref()
}

function handleClickNumber(number) {
    if (number.checked) {
        currentValueNumber = number.value;
        window.electronAPI.setDone("number", number.id)
    }
    generateHref();
}

async function handleClickChapter(chapter) {
    currentValueChapter[chapter.value] = !currentValueChapter[chapter.value];//boolean
    window.electronAPI.setDone("chapters", currentValueChapter)
    console.log(await window.electronAPI.getDone("chapters"));

    generateHref()
}

function generateHref() {
    const link = document.getElementById("nextPage");
    let chaptersParam = "";
    for (let i = 1; i <= 3; i++) {
        if (currentValueChapter[i]) {
            chaptersParam = chaptersParam + i.toString() + ",";
        }

    }
    chaptersParam = chaptersParam.substring(0, chaptersParam.length - 1);

    link.href = "quiz.html?" +
        "time=" +
        currentValueTime.toString() +
        "&number=" +
        currentValueNumber.toString() +
        "&chapters=" +
        chaptersParam;
}

document.querySelectorAll("#time input").forEach(inputEl => {
    inputEl.addEventListener("click", event => handleClickTime(event.target))
})

document.querySelectorAll("#number input").forEach(inputEl => {
    inputEl.addEventListener("click", event => handleClickNumber(event.target))
})

document.querySelectorAll(".div-checkbox input").forEach(inputEl => {
    inputEl.addEventListener("click", event => handleClickChapter(event.target))
})

window.onload=loadPreferences;