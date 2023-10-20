async function onLoginPress() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value;

    try {
        await signIn(email, password)

        hideModal()
    } catch (e) {
        // switch(e.code)
        const p = document.getElementById("login_error")
        p.innerHTML = e
    }
}

async function onSignupPress() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value;

    try {
        await signUp(email, password)

        hideModal()
    } catch (e) {
        const p = document.getElementById("login_error")
        p.innerHTML = e
    }
}

function hideLoginButtonIfLoggedIn() {
    if (isLoggedIn()) {
        document.getElementById("show-login").style.display = "none"
    }
}


function showModal() {
    document.getElementById("auth-container").style.display = "flex"
}

function hideModal() {
    document.getElementById("auth-container").style.display = "none"
}

document.getElementById("show-login").addEventListener("click", async() => {
    await signOut()
    showModal()
})

document.getElementById("login").addEventListener("click", () => {
    onLoginPress()
})

document.getElementById("signup").addEventListener("click", () => {
    onSignupPress()
})

onAuthStateChange(() => {
  if (!isLoggedIn()){
      showModal()
  }
})