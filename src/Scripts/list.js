console.log(window.location.href);
const arr = mapProblems.size;

async function generateElements() {

    for(let i=1;i<=arr;i++) {
        const problemName = "Problema "+i.toString();
        const done = await window.electronAPI.getDone(problemName);

        const el = document.createElement("a")
        el.className = "button-8 width-1000"
        if(done===true){
          el.style.backgroundColor="#a9e59f";
        }
        else if(done==="false"){
            el.style.backgroundColor="#e59f9f"
        }
        el.innerHTML = problemName;
        el.href = "problem.html?"
            +"problemName="
            +problemName;
        const div = document.querySelector("div");
        div.appendChild(el);

    }

}


generateElements();