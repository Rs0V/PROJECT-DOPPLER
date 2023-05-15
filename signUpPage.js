window.onload = () => {
    const charLimit = 22

    const textInputs = [...document.querySelectorAll(".form-text")]
    textInputs.forEach((elem) => {
        elem.addEventListener("input", () => {
            if (elem.value == "" || elem.value == " ")
                elem.value = ""
            else
                if (elem.value[0] != " ")
                    elem.value = " " + elem.value.trim()
                else
                    if (elem.value.length > charLimit)
                        elem.value = elem.value.slice(0, elem.value.length - 1)
        })
    })

    window.addEventListener("resize", () => {
        const logoDiv = document.getElementById("logo")
        logoDiv.style.height = getComputedStyle(logoDiv).width
    })
}