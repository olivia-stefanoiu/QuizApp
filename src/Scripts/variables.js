let problems = {
    "categoriaFC": []
    , "categoriaFO": []
    , "categoriaIR": []
    , "categoriaIT": []
    , "categoriaITR": []
    , "categoriaSLR": []
}

const categorii = ["categoriaFC", "categoriaFO", "categoriaIR", "categoriaIT", "categoriaITR", "categoriaSLR"]

async function getXml() {
    let xmlObject;


    for (let i = 0; i < categorii.length; i++) {//categorii.length
        xmlObject = await window.electronAPI.parseXml(categorii[i]);//id enunt raspunsuri, raspuns corect
       /*
        console.log(xmlObject.quiz.question[0])
        console.log(xmlObject.quiz.question[0].questiontext[0].text[0])//enunt
        console.log(xmlObject.quiz.question[0].answer.length);//raspunsurile
        console.log(xmlObject.quiz.question.length)//numarul de intrebari
*/
        xmlObject.quiz.question.forEach((question, index) => {
            problems[categorii[i]].push({
                nr: index,
                name: `Problema ${index+1}.`,
                id: `Problema${index+1}-${categorii[i]}`,
                questiontext:question.questiontext[0].text[0],
                answers:question.answer
            })
        })

    }

    // for (let j = 0; j < xmlObject.quiz.question.length; j++) {
    //     problems[categorii[i]][currentNumber].nr = j;
    //     problems[categorii[i]][currentNumber].name = "Problema " + j + ".";
    //     problems[categorii[i]][currentNumber].id = "Problema " + j + categorii[i]
    //     problems[categorii[i]][currentNumber]
    // }

}

//console.log(problems["categoriaFC"][0].name);

/*
for (const problem of problems["categoriaFC"]){
    console.log(wololo);
    console.log(problem.name);
}
*/

