const urlSearchParams = new URLSearchParams(window.location.search);
const currentValueTime = urlSearchParams.get("time");
const currentValueNumber = urlSearchParams.get("number");
const currentValueChapter = urlSearchParams.get("chapters");

//<script defer src="//unpkg.com/mathlive"></script>
//<script type={module}></script>

import 'mathlive';

const mf = document.getElementById('formula');
mf.addEventListener('input',(ev) => {
// `ev.target` is an instance of `MathfieldElement`
    console.log(ev.target.getValue('math-json'));
});