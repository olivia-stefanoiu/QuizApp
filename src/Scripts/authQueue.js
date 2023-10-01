const onAuthStateChangeFnQueue = []

function onAuthStateChange(fn){
    onAuthStateChangeFnQueue.push(fn)
}