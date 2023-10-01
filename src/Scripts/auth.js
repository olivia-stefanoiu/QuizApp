async function onLoginPress() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value;

    await signIn(email, password)

    hideModal()
    hideLoginButtonIfLoggedIn()
}

async function onSignupPress() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value;

    await signUp(email, password)

    hideModal()
    hideLoginButtonIfLoggedIn()
}

function hideLoginButtonIfLoggedIn(){
    if(isLoggedIn()){
        document.getElementById("show-login").style.display = "none"
    }
}


function showModal() {
    document.getElementById("auth-container").style.display = "flex"
}

function hideModal() {
    document.getElementById("auth-container").style.display = "none"
}

document.getElementById("show-login").addEventListener("click", () => {
    showModal()
})

document.getElementById("hide-login").addEventListener("click", () => {
    hideModal()
})

document.getElementById("login").addEventListener("click", () => {
    onLoginPress()
})

document.getElementById("signup").addEventListener("click", () => {
    onSignupPress()
})

document.onload = hideLoginButtonIfLoggedIn