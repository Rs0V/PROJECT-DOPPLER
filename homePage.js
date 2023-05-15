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
        location.href = "libraryPage.html"
    })
    
    const favorites = document.getElementById("favorites")
    favorites.addEventListener("click", () => {
        location.href = "favoritesPage.html"
    })
    
    const signup = document.getElementById("signup")
    signup.addEventListener("click", () => {
        signup.style.border = "0"
        signup.style.color = "white"
        signup.style.transition = "color 0s"
        signup.style.transition = "background-color 0s"
        signup.style.backgroundColor = "rgb(60, 60, 60)"
        setTimeout(() => {
            location.href = "signUpPage.html"
        }, 500)
    })
    
    const login = document.getElementById("login")
    login.addEventListener("click", () => {
        login.style.border = "0"
        login.style.color = "white"
        login.style.transition = "color 0s"
        login.style.transition = "background-color 0s"
        login.style.backgroundColor = "rgb(60, 60, 60)"
        setTimeout(() => {
            location.href = "logInPage.html"
        }, 500)
    })
}