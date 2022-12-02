let currentValueTime = 0;
let currentValueNumber = 0;
let currentValueChapter = [];

function handleClickTime(radio) {
    if(radio.checked)
    currentValueTime = radio.value;
    generateHref()
}

function handleClickNumber(number) {
    if(number.checked)
    currentValueNumber = number.value;
    generateHref();
}

function handleClickChapter(chapter) {
    currentValueChapter[chapter.value] = !currentValueChapter[chapter.value];
    generateHref()
}

function generateHref() {
    const link = document.querySelector("a")
    let chaptersParam = "";
    for (let i = 1; i <= 3; i++) {
        if (currentValueChapter[i]) {
            chaptersParam = chaptersParam + i.toString() + ",";
        }

    }
    chaptersParam = chaptersParam.substring(0, chaptersParam.length - 1)
    link.href = "quiz.html?" +
        "time=" +
        currentValueTime.toString() +
        "&number=" +
        currentValueNumber.toString() +
        "&chapters=" +
        chaptersParam;
}