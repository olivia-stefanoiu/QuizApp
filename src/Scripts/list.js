const urlSearchParams = new URLSearchParams(window.location.search);
const currentCategory = urlSearchParams.get("category");

async function generateElements() {

    for (let i = 1; i <= problems[currentCategory].length; i++) {

        const problemName = "Problema " + i.toString();
        const problemId = problemName + currentCategory;

        const done = await window.getDone(problemId);

        const el = document.createElement("a")
        el.className = "button-8 width-1000"

        if (done === true) {
            el.style.backgroundColor = "#a9e59f";
        } else if (done === "false") {
            el.style.backgroundColor = "#e59f9f"
        }

        el.innerHTML = problemName;
        el.href = "problem.html?"
            + "&category=" +
            currentCategory
            + "&nr="
            + (i - 1)+
            "&problemId="+
            problemId;

        const div = document.querySelector("div");//!!!!!!!!
        div.appendChild(el);

    }

}

onAuthStateChange(()=>{
    getXml().then(()=>{
        generateElements()
    })
})