window.onload = () => {
    const textInputs = [...document.querySelectorAll(".form-text")]

    textInputs.forEach(inputElem => {
        inputElem.addEventListener("input", () => {
            inputElem.value = cleanInput(inputElem.value)
        })
    })

    window.addEventListener("resize", () => {
        const logoDiv = document.getElementById("logo")
        logoDiv.style.height = getComputedStyle(logoDiv).width
    })

    const loginButton = document.getElementById("loginButton")
    loginButton.addEventListener("click", () => {
        const username = textInputs[0].value.trim()
        const password = textInputs[1].value.trim()

        const cond1 = username != ""
        const cond2 = password != ""
        const userpass = (cond1) ? window.localStorage.getItem(username) : null
        const cond3 = (userpass) ? true : false
        const cond4 = (cond3 && cond2 && userpass == password)
        const conds = [cond1, cond2, cond3, cond4].every(elem => elem === true)

        if (conds) {
            loginButton.style.color = "rgba(254, 238, 219, 0.6)"
            loginButton.style.backgroundImage = "linear-gradient(180deg, rgba(87, 51, 33) 20%, rgba(207, 167, 115) 180%)"
            window.localStorage.setItem("LoggedInAs", username)
            setTimeout(() => {
                location.href = "homePage.html"
            }, 500)
        }
        else {
            if (cond1 == false)
                window.alert("A Username is required to log in")
            else if (cond3 == false)
                window.alert("User does not exist. Sign Up if you didn't already")
            else {
                if (cond2 == false)
                    window.alert("A Password is required to log in")
                else if (cond1 && cond2 && cond4 == false)
                    window.alert("Password is incorrect")
            }
        }
    })
}

function cleanInput(str) {
    let newstr = ""
    for (let index = 0; index < str.length; ++index) {
        const char = str.charAt(index)
        if (char.toLowerCase() != char.toUpperCase() || (isNaN(parseInt(char)) == false && parseInt(char) >= 0 && parseInt(char) <= 9))
            newstr += char
        else {
            window.alert("Only letters 'a-z', 'A-Z' and digits '0-9' are allowed")
            return newstr
        }
    }
    return newstr
}