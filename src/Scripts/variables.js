let problems = {
    "categoriaFC": []
    , "categoriaFO": []
    , "categoriaIR": []
    , "categoriaIT": []
    , "categoriaITR": []
    , "categoriaSLR": []
}
const categorii = ["categoriaFC", "categoriaFO", "categoriaIR", "categoriaIT", "categoriaITR", "categoriaSLR"]
function removeTextFromString(str) {
    const startString = '<span style';
    const endChar = '>';

    while (str.indexOf(startString) !== -1) {
        const startIndex = str.indexOf(startString);
        const endIndex = str.indexOf(endChar, startIndex);

        if (startIndex >= 0 && endIndex >= 0) {
            str = str.slice(0, startIndex) + str.slice(endIndex + 1);
        }
    }

    return str;
}

function removeCharacters(str) {
    const regex = /<\/?p>|<\/?span>|&nbsp;/gi;
    return str.replace(regex, "");
}

// function insertSpace(str) {
//     const regex = / /g;
//     const replacement = "\\mspace{5mu} ";
//     return str.replace(regex, replacement);
// }

function parseLatex(problem) {
    // const regex3 = /(\$|\\\(|\\\)|\\\[|\\\]|\\begin\{.?\}|\\end\{.?\}|\s\\\w+{.*?}\s)/g
    const regex = /\$|\\\(|\\\)|\\\[|\\\]/g
    const tokens = problem.split(regex)

    return tokens;
}


function stripHtml(html) {

    let strip = html;

    strip = removeTextFromString(strip)
    strip = removeCharacters(strip)
    strip = parseLatex(strip)
   // strip = insertSpace(strip)

    return strip;
}

function stripHtmlQuestion(html) {
    //console.log(html)
    const questionStrip=[]
    for(let i=0;i<html.length;i++) {
        let strip = html[i].text[0]

        strip = removeTextFromString(strip)
        strip = removeCharacters(strip)
        strip = parseLatex(strip)
        // strip = insertSpace(strip)
        questionStrip.push(strip)
    }

    return questionStrip;
}

function generateCorrectAnswerVector(answers){
    const correctAnswer =[]
    for (let i=0;i<answers.length;i++){
        correctAnswer[i]=answers[i].$.fraction;
    }
    return correctAnswer;
}

async function getXml() {
    let xmlObject;

    for (let i = 0; i < categorii.length; i++) {//categorii.length
        xmlObject = {...parsedProblems[categorii[i]]};//id enunt raspunsuri, raspuns corect

        xmlObject.quiz.question.forEach((question, index) => {
            problems[categorii[i]].push({
                nr: index,
                name: `Problema ${index + 1}.`,
                id: `Problema${index + 1}-${categorii[i]}`,
                questiontext: stripHtml(question.questiontext[0].text[0]),
                answers: stripHtmlQuestion(question.answer), //question.answers
                raspuns:stripHtml(question.generalfeedback[0].text[0]),
                correctAnswer: generateCorrectAnswerVector(question.answer)
            })
        })

    }
    console.log(xmlObject);
    console.log(problems)
}

