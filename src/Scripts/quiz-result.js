function displayResult(heading) {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const totalProblems = urlSearchParams.get("nrProbleme")
    const solvedProblems = urlSearchParams.get("nrProblemeRezolvate")

    heading.innerHTML = `${solvedProblems} / ${totalProblems}`
}

function main(){
    const heading = document.getElementById("result")
    displayResult(heading)
}

main()

