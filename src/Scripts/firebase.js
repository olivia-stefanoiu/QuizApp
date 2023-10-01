import "https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js";
// Required for side-effects

import "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore-compat.js";
import "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth-compat.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASJ3DEm1nmV-eoqLgas80t4YbiW43nPPQ",
    authDomain: "analiza-complexa.firebaseapp.com",
    projectId: "analiza-complexa",
    storageBucket: "analiza-complexa.appspot.com",
    messagingSenderId: "205360201772",
    appId: "1:205360201772:web:f31fb9174171f47cf41189"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

async function signUp(email, password) {
    await auth.setPersistence( "session");
    await auth.createUserWithEmailAndPassword(email, password)

    const uid = auth.currentUser?.providerData?.[0]?.uid
    const docRef = db.collection("userData").doc(uid);
    await docRef.set({})
}

async function signIn(email, password) {
    await auth.setPersistence("session");
    await auth.signInWithEmailAndPassword(email, password)
    // ...
}


async function setDone(id, done) {
    localStorage.setItem(id, done)

    const uid = auth.currentUser?.providerData?.[0]?.uid
    if (!uid) {
        return
    }

    const docRef = db.collection("userData").doc(uid);
    await docRef.update( {[id]: done})

}

async function getDone(id) {
    const cached = localStorage.getItem(id)

    if(cached !== null){
        return cached
    }

    const uid = auth.currentUser?.providerData?.[0]?.uid
    if (!uid) {
        return
    }

    const docRef = db.collection("userData").doc(uid);
    const docSnap = (await docRef.get()).data()

    return docSnap[id]
}

async function eraseAllForUser() {
    localStorage.clear()

    const uid = auth.currentUser?.providerData?.[0]?.uid
    if (!uid) {
        return
    }

    const docRef = db.collection("userData").doc(uid);
    await docRef.set({})
}

function isLoggedIn(){
    return !!auth.currentUser?.providerData?.[0]?.uid
}

window.signUp = signUp
window.signIn = signIn
window.setDone = setDone
window.eraseAllForUser = eraseAllForUser
window.getDone = getDone
window.isLoggedIn = isLoggedIn

auth.onAuthStateChanged(()=>{
    onAuthStateChangeFnQueue.forEach(fn=>fn())
})
