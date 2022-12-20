let problems = {
    "categoria1": [
        {nr:1, name:"Problema 1.  ", id: "Problema 1categoria1", enunt: "Sa se rezolve 1+1", answer: "1"},
        {nr:2, name:"Problema 2.  ", id: "Problema 2categoria1", enunt: "Sa se rezolve 2+2", answer: "2"},
        {nr:3, name:"Problema 3.  ", id: "Problema 3categoria1", enunt: "Sa se rezolve 3+3", answer: "3"}
    ]
    , "categoria2": [
        {nr:1, name:"Problema 1.  ", id: "Problema 1categoria2", enunt: "Sa se rezolve 1*1", answer: "1"},
        {nr:2, name:"Problema 2.  ", id: "Problema 2categoria2", enunt: "Sa se rezolve 2*2", answer: "2"},
        {nr:3, name:"Problema 3.  ", id: "Problema 3categoria2", enunt: "Sa se rezolve 3*3", answer: "3"}
    ]
}

const categorii=["categoriaFC","categoriaFO","categoriaIR","categoriaIT","categoriaITR","categoriaSLR"]


async function getXml() {
    let xmlObject;


    for(let i=0;i<categorii.length;i++){
        xmlObject= await window.electronAPI.parseXml(categorii[i]);
        console.log(xmlObject)
    }
}

getXml();

