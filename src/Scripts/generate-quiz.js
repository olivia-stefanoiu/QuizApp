let currentValueTime = 0;
let currentValueNumber = 0;
let currentValueChapter = [0,0,0,0,0];


async function loadPreferences() {

    //get the preferences form local
    if(await window.getDone("time")!==undefined) {
        currentValueTime = document.getElementById(await window.getDone("time")).value;
    }
    if(await window.getDone("number")!==undefined) {
        currentValueNumber = document.getElementById(await window.getDone("number")).value;
    }
    if(await window.getDone("chapters")!==undefined) {
        currentValueChapter = await window.getDone("chapters");
    }

   //check the boxes
    if(currentValueTime!==0) {
        document.getElementById(await window.getDone("time")).checked = true;
    }
    if(currentValueNumber!==0) {
        document.getElementById(await window.getDone("number")).checked = true;
    }
    if(currentValueChapter!==[0,0,0,0,0]) {//look into
        for (let i = 0; i <= 5; i++) {
            if (currentValueChapter[i]) {
                document.getElementById(categorii[i]).checked = true;
            }
        }
    }

   generateHref();

}

function handleClickTime(time) {
    if (time.checked) {
        currentValueTime = time.value;//value variabila introdusa de noi
        window.setDone("time", time.id)
    }
    generateHref()
}

function handleClickNumber(number) {
    if (number.checked) {
        currentValueNumber = number.value;
        window.setDone("number", number.id)
    }
    generateHref();
}

function handleClickChapter(chapter) {
    currentValueChapter[chapter.value] = !currentValueChapter[chapter.value];//boolean
    window.setDone("chapters", currentValueChapter)

    generateHref()
}

function generateHref() {
    const link = document.getElementById("nextPage");
    let chaptersParam = "";
    for (let i = 0; i <= 5; i++) {
        if (currentValueChapter[i]) {
            chaptersParam = chaptersParam + categorii[i] + ",";
        }
    }

    chaptersParam = chaptersParam.substring(0,chaptersParam.length-1)

   //chaptersParam = chaptersParam.substring(0, chaptersParam.length - 1);
console.log(currentValueTime.toString())
    link.href = "quiz.html?" +
        "&time=" +
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

//for onload stuff
onAuthStateChange(()=>{
    loadPreferences()})