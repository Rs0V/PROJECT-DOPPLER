window.onload = () => {
    const genresGrid = document.getElementById("genres")
    const threshold = 10

    genresGrid.style.gridTemplateColumns = `repeat(4, ${screen.availWidth / 4}px)`

    window.addEventListener("resize", () => {
        const gridStyle = getComputedStyle(genresGrid)
        const gridWidth = parseFloat(gridStyle.width.slice(0, -2))

        const cellsize = screen.availWidth / 4

        if (gridWidth > screen.availWidth - threshold * 2 - (window.outerWidth - window.innerWidth))
            genresGrid.style.gridTemplateColumns = `repeat(4, ${cellsize}px)`

        else if (gridWidth > screen.availWidth / 4 * 3 - threshold)
            genresGrid.style.gridTemplateColumns = `repeat(3, ${cellsize}px)`

        else if (gridWidth > screen.availWidth / 2 - threshold)
            genresGrid.style.gridTemplateColumns = `repeat(2, ${cellsize}px)`

        else
            genresGrid.style.gridTemplateColumns = `repeat(1, ${cellsize}px)`
    })

    const genres = [...document.querySelectorAll(".genre")]
    genres.forEach((genre, index) => {
        genre.style.filter = `hue-rotate(${randInt(40, 300)}deg)`

        const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "cyan", "magenta", "lime", "black", "white"]
        const color1 = colors[Math.min(randInt(0, colors.length), colors.length - 1)]
        const color2 = omit(colors, color1)[Math.min(randInt(0, colors.length - 1), colors.length - 2)]
        genre.style.background = `linear-gradient(${randInt(0, 360)}deg, ${color1}, ${color2})`
        
        var repeater
        genre.addEventListener("mouseover", () => {
            repeater = setInterval(() => {
                let hue = getComputedStyle(genre).filter
                hue = parseInt(hue.slice(hue.search("hue") + 11, hue.search("deg")))
                genre.style.filter = `hue-rotate(${hue + 1}deg)`
            }, 10)
        })

        genre.addEventListener("mouseout", () => {
            clearInterval(repeater)
        })

        genre.addEventListener("click", () => {
            switch (index) {
                case 0:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFEC4WFtoNRpw"
                    break;
                case 1:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFQ00XGBls6ym"
                    break;
                case 2:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFDXXwE9BDJAr"
                    break;
                case 3:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFHOzuVTgTizF"
                    break;
                case 4:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFPrEiAOxgac3"
                    break;
                case 5:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFQiK2EHwyjcU"
                    break;
                case 6:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFAJ5xb0fwo9m"
                    break;
                case 7:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFKLfwjuJMoNC"
                    break;
                case 8:
                    location.href = "https://open.spotify.com/genre/0JQ5DAqbMKFGvOw3O4nLAf"
                    break;
                default:
                    location.href = "https://youtu.be/xvFZjo5PgG0"
                    break;
            }
        })
    })

    const searchBar = document.getElementById("search-bar")
    const searchButton = document.getElementById("search-button")
    searchButton.addEventListener("click", () => {
        let searchTokens = searchBar.value.trim().split(" ").filter(elem => elem != " " && elem != "").map(token => token.toLowerCase())
        genres.forEach(genre => {
            const paragraph = [...genre.getElementsByTagName("p")][0].innerHTML.toLowerCase()

            if (searchTokens.length > 0) {
                let matched = false

                for(let i = 0; i < searchTokens.length; ++i) {
                    if (paragraph.search(searchTokens[i]) > -1) {
                        matched = true
                        break
                    }
                }
                if (matched == true)
                    genre.style.display = ""
                else
                    genre.style.display = "none"
            }
            else
                genre.style.display = ""
        })
    })

    window.addEventListener('keypress', event => {
        if (event.key === "Enter") {
            let searchTokens = searchBar.value.trim().split(" ").filter(elem => elem != " " && elem != "").map(token => token.toLowerCase())
            genres.forEach(genre => {
                const paragraph = [...genre.getElementsByTagName("p")][0].innerHTML.toLowerCase()

                if (searchTokens.length > 0) {
                    let matched = false

                    for(let i = 0; i < searchTokens.length; ++i) {
                        if (paragraph.search(searchTokens[i]) > -1) {
                            matched = true
                            break
                        }
                    }
                    if (matched == true)
                        genre.style.display = ""
                    else
                        genre.style.display = "none"
                }
                else
                    genre.style.display = ""
            })
        }
    })

    searchButton.addEventListener("mousedown", () => {
        searchButton.style.backgroundColor = "rgb(70, 70, 70)"
    })

    searchButton.addEventListener("mouseup", () => {
        searchButton.style.backgroundColor = ""
    })
}

function randInt(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

function omit(arr, elem) {
    const index = arr.findIndex(elem1 => elem1 == elem)
    if (index > -1) {
        const newArray = arr.slice(0, index).concat(arr.slice(index + 1, arr.length))
        return newArray
    }
    return arr
}