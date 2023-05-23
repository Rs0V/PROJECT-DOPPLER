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

    const signButton = document.getElementById("signButton")
    const tcBox = document.getElementById("tcCheck")
    signButton.addEventListener("click", () => {
        const cond1 = textInputs[0].value.trim() != ""
        const cond2 = password != ""
        const cond3 = tcBox.checked
        const cond4 = (window.localStorage.getItem(textInputs[0].value.trim())) ? false : true
        const conds = [cond1, cond2, cond3, cond4].every(elem => elem == true)
        if (conds) {
            signButton.style.color = "rgba(219, 241, 254, 0.6)"
            signButton.style.backgroundImage = "linear-gradient(0deg, rgba(145, 191, 224, 0.3) 20%, rgba(69, 87, 98, 0.6) 180%)"
            window.localStorage.setItem(textInputs[0].value.trim(), password)
            window.localStorage.setItem("LogedInAs", textInputs[0].value.trim())
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
                if (cond3 == false)
                    window.alert("You need to agree to the Terms and Conditions before Signing Up")
            }
            
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