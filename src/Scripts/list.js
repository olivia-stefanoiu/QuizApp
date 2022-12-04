const arr = [1,2,3]

async function generateElements() {
    let i=1;
    for(const element of arr) {
        const problemName = "Problema "+i;
        const done = await window.electronAPI.getDone(problemName);

        const el = document.createElement("a")
        el.className = "button-8 width-1000"
        if(done===true){
          el.style.backgroundColor="#a9e59f";
        }
        else if(done===false){
            el.style.backgroundColor="#e59f9f"
        }
        el.innerHTML = problemName;
        el.href = "problem.html?"
            +"problemName="
            +problemName;
        const div = document.querySelector("div");
        div.appendChild(el);

        i++;
    }

}








generateElements()