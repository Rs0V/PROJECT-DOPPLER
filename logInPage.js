window.onload = () => {
    const charLimit = 22

    const textInputs = [...document.querySelectorAll(".form-text")]

    let password = ""

    textInputs.forEach((elem, index) => {
        if (index == 0) {
            elem.addEventListener("input", () => {
                if (elem.value == "" || elem.value == " ")
                    elem.value = ""
                else {
                    elem.value = " " + cleanUser(elem.value)
                    if (elem.value.length > charLimit + 1)
                        elem.value = elem.value.slice(0, elem.value.length - 1)
                }
            })
        }
        else {
            elem.addEventListener("input", () => {
                if (elem.value == "" || elem.value == " ") {
                    elem.value = ""
                    password = ""
                }
                else {
                    elem.value = " " + cleanPass(elem.value)
                    if (elem.value.length > charLimit + 1)
                        elem.value = elem.value.slice(0, elem.value.length - 1)
                    // Record Password
                    if (cleanPass(elem.value).length < password.length)
                        password = password.slice(0, cleanPass(elem.value).length)
                    else if(cleanPass(elem.value).length > password.length)
                        password += elem.value.charAt(elem.value.length - 1)
                }
                // Mask Password
                if (textInputs[1].value.length > 1) {
                    textInputs[1].value = " " + "★".repeat((textInputs[1].value.length - 1))
                    textInputs[1].style.fontSize = "12px"
                }
                else
                    textInputs[1].style.fontSize = ""
            })
        }
    })

    window.addEventListener("resize", () => {
        const logoDiv = document.getElementById("logo")
        logoDiv.style.height = getComputedStyle(logoDiv).width
    })

    const signButton = document.getElementById("loginButton")
    signButton.addEventListener("click", () => {
        const cond1 = textInputs[0].value.trim() != ""
        const cond2 = password != ""
        const userpass = (cond1) ? window.localStorage.getItem(textInputs[0].value.trim()) : null
        const cond3 = (userpass) ? true : false
        const cond4 = (cond3 && cond2 && userpass == password)
        const conds = [cond1, cond2, cond3, cond4].every(elem => elem == true)
        if (conds) {
            signButton.style.color = "rgba(254, 238, 219, 0.6)"
            signButton.style.backgroundImage = "linear-gradient(180deg, rgba(87, 51, 33) 20%, rgba(207, 167, 115) 180%)"
            setTimeout(() => {
                location.href = "homePage.html"
            }, 500)
        }
        else {
            if (cond1 == false)
                window.alert("A Username is required to log in")
            if (cond2 == false)
                window.alert("A Password is required to log in")
            else if (cond1 && cond3 == false)
                window.alert("User does not exist. Sign Up if you didn't already")
            else if (cond1 && cond2 && cond4 == false)
                window.alert("Password is incorrect")
        }
    })
}

function cleanUser(str) {
    let newstr = ""
    for (let index = 0; index < str.length; ++index) {
        const char = str[index];
        if (char.toLowerCase() != char.toUpperCase() || (parseInt(char) >= 0 && parseInt(char) <= 9))
            newstr += char
    }
    return newstr
}

function cleanPass(str) {
    let newstr = ""
    for (let index = 0; index < str.length; ++index) {
        const char = str[index];
        if (char.toLowerCase() != char.toUpperCase() || (parseInt(char) >= 0 && parseInt(char) <= 9) || char == "★")
            newstr += char
    }
    return newstr
}