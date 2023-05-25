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

    const signButton = document.getElementById("signButton")
    const tcBox = document.getElementById("tcCheck")
    signButton.addEventListener("click", () => {
        const username = textInputs[0].value.trim()
        const password = textInputs[1].value.trim()

        const cond1 = username != ""
        const cond2 = password != ""
        const cond3 = tcBox.checked
        const cond4 = (window.localStorage.getItem(username)) ? false : true
        const conds = [cond1, cond2, cond3, cond4].every(elem => elem === true)

        if (conds) {
            signButton.style.color = "rgba(219, 241, 254, 0.6)"
            signButton.style.backgroundImage = "linear-gradient(0deg, rgba(145, 191, 224, 0.3) 20%, rgba(69, 87, 98, 0.6) 180%)"
            window.localStorage.setItem(username, password)
            window.localStorage.setItem("LoggedInAs", username)
            setTimeout(() => {
                location.href = "homePage.html"
            }, 500)
        }
        else {
            if (cond1 == false)
                window.alert("You need to provide a Username for the account")
            else if (cond4 == false)
                window.alert("User already exists")
            else {
                if (cond2 == false)
                    window.alert("You need to provide a Password for the account")
                else if (cond3 == false)
                    window.alert("You need to agree to the Terms and Conditions before Signing Up")
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