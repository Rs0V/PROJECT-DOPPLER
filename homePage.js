window.onload = () => {
    const home = document.getElementById("home")
    home.addEventListener("click", () => {
        location.href = "homePage.html"
    })
    
    const search = document.getElementById("search")
    search.addEventListener("click", () => {
        location.href = "searchPage.html"
    })
    
    const library = document.getElementById("library")
    library.addEventListener("click", () => {
        if(window.localStorage.getItem("LoggedInAs") && window.localStorage.getItem("LoggedInAs") != "none")
            location.href = "libraryPage.html"
        else
            window.alert("You need to be logged in to see your music library")
    })
    
    const favorites = document.getElementById("favorites")
    favorites.addEventListener("click", () => {
        if(window.localStorage.getItem("LoggedInAs") && window.localStorage.getItem("LoggedInAs") != "none")
            location.href = "favoritesPage.html"
        else
            window.alert("You need to be logged in to check your favorite songs")
    })
    
    const signup = document.getElementById("signup")
    signup.addEventListener("click", () => {
        profileButtonClick(signup)
        setTimeout(() => {
            location.href = "signUpPage.html"
        }, 500)
    })
    
    const login = document.getElementById("login")
    login.addEventListener("click", () => {
        profileButtonClick(login)
        setTimeout(() => {
            location.href = "logInPage.html"
        }, 500)
    })

    const profile = document.getElementById("profile")
    const profileName = document.getElementById("profile-name")
    const logout = document.getElementById("logout")
    logout.addEventListener("click", () => {
        profileButtonClick(logout)
        setTimeout(() => {
            window.localStorage.setItem("LoggedInAs", "none")
            location.href = "homePage.html"
        }, 500)
    })

    if(window.localStorage.getItem("LoggedInAs") && window.localStorage.getItem("LoggedInAs") != "none") {
        signup.style.display = "none"
        login.style.display = "none"
        profile.style.display = ""
        profileName.innerHTML = `${window.localStorage.getItem("LoggedInAs")}`
        logout.style.display = ""
    }
    else {
        window.localStorage.setItem("LoggedInAs", "none")
        signup.style.display = ""
        login.style.display = ""
        profile.style.display = "none"
        logout.style.display = "none"
    }
}



function profileButtonClick(obj){
    obj.style.border = "0"
    obj.style.color = "white"
    obj.style.transition = "color 0s"
    obj.style.transition = "background-color 0s"
    obj.style.backgroundColor = "rgb(60, 60, 60)"
}