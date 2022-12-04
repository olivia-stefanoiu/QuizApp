const arr = [1,2,3]

function generateElements() {
    let i=1;
    for(const element of arr) {
        const problemName = "Problema "+i;
       // const isDone = storage.get(problemName);

        const el = document.createElement("a")
        console.log(el)
        el.className = "button-8 width-1000"
        el.innerHTML = problemName;
        el.href = "problem.html";
        const div = document.querySelector("div");
        div.appendChild(el);

        i++;
    }

}



window.onload = generateElements;