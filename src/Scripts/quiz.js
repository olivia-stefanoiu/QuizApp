//import 'mathlive';

const urlSearchParams = new URLSearchParams(window.location.search);
const currentValueTime = urlSearchParams.get("time");
const currentValueNumber = urlSearchParams.get("number");
const currentValueChapter = urlSearchParams.get("chapters");

//<script defer src="//unpkg.com/mathlive"></script>
//<script type={module}></script>


const mf = document.getElementById('formula');


function insertSymbol(target) {
    let append = target.getAttribute("data-latex");
    mf.setValue(mf.value+append,{suppressChangeNotifications: true});
    //mf.executeCommand(['insert', "\\int_0^\\infty\\limits"]);

}


/*
mf.setOptions({
    virtualKeyboardMode: "manual",
    virtualKeyboards: "numeric symbols"
});

mf.setOptions({
    "customVirtualKeyboardLayers": HIGH_SCHOOL_KEYBOARD_LAYER,
    "customVirtualKeyboards": HIGH_SCHOOL_KEYBOARD,
    "virtualKeyboards": "high-school-keyboard"
});
*/

document.querySelectorAll("button ").forEach(inputEl => {
    inputEl.addEventListener("click", event => insertSymbol(event.target))

})