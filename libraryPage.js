window.onload = () => {
    const user = window.localStorage.getItem("LoggedInAs")
    let songs = window.localStorage.getItem(`${user}-lib`)

    if (songs && songs != "none") {
        songs = songs.split(", ")
        songs = songs.map(elem => elem.replaceAll("{", "").replaceAll("}", "").trim()).filter(elem => elem != "" && elem != " ")
    }

    const main = [...document.getElementsByTagName("main")][0]

    const title = document.createElement("p")
    title.innerHTML = "Library"

    title.style.fontFamily = 'Rajdhani';
    title.style.fontSize = "48px";
    title.style.fontWeight = "600";

    title.style.color = "gray";
    title.style.marginTop = "24px"
    title.style.marginBottom = "12px"

    title.style.alignSelf = "center"

    main.append(title)

    if (songs == null || songs == "none" || songs.length == 0) {
        const oops = document.createElement("p")
        oops.innerHTML = "Looks like you haven't saved any songs to your library yet"

        oops.style.fontFamily = 'Rajdhani';
        oops.style.fontSize = "24px";
        oops.style.fontWeight = "500";

        oops.style.color = "gray";

        oops.style.marginTop = "32px"

        main.style.alignItems = "center";
        main.append(oops)
    }
    else {
        for (let index = 0; index < songs.length - 1; index += 2) {
            // SONG BUTTON
            const song = document.createElement("button")
            song.innerHTML = songs[index]

            song.style.fontFamily = 'Rajdhani';
            song.style.fontSize = "24px";
            song.style.fontWeight = "600";
            
            song.style.background = "linear-gradient(rgb(40, 40, 40), 90%, rgb(50, 50, 50))"
            song.style.color = "white";

            song.style.borderRadius = "36px"
            song.style.width = "92%"

            song.style.marginTop = "24px"
            song.style.marginLeft = "24px"

            song.style.textAlign = "left"
            song.style.paddingLeft = "24px"
            song.style.paddingRight = "24px"
            song.style.paddingTop = "12px"
            song.style.paddingBottom = "12px"

            song.style.boxShadow = "0px 12px 12px rgba(0, 0, 0, 0.2)"

            song.style.cursor = "pointer"
            
            song.addEventListener("mouseover", () => {
                song.style.background = "rgb(50, 50, 50)"
            })
            song.addEventListener("mouseout", () => {
                song.style.background = "linear-gradient(rgb(40, 40, 40), 90%, rgb(50, 50, 50))"
            })
            song.addEventListener("click", event => {
                event.stopPropagation()
                location.href = songs[index + 1]
            })
            song.addEventListener("mousedown", () => {
                song.style.background = "rgb(30, 30, 30)"
            })
            song.addEventListener("mouseup", () => {
                song.style.background = "linear-gradient(rgb(40, 40, 40), 90%, rgb(50, 50, 50))"
            })

            main.append(song)



            // TRASH BUTTON
            const trash = document.createElement("button")
            const trashImg = document.createElement("img")

            trashImg.src = "trash.png"
            trashImg.style.width = "100%"
            trashImg.style.height = "100%"

            trash.append(trashImg)
            
            trash.style.position = "absolute"
            trash.style.top = `${song.getBoundingClientRect().top}px`
            trash.style.left = `${song.getBoundingClientRect().right}px`

            window.addEventListener("resize", () => {
                trash.style.top = `${song.getBoundingClientRect().top}px`
                trash.style.left = `${song.getBoundingClientRect().right}px`
            })

            trash.style.background = "transparent"

            trash.style.width = "54px"
            trash.style.height = "54px"
            trash.style.marginLeft = "12px"

            trash.style.filter = "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2)) brightness(50%)"
            trash.style.cursor = "pointer"

            trash.style.transform = "scale(100%)"
            trash.style.transition = "transform 0.3s"
            
            trash.addEventListener("mouseover", () => {
                trash.style.transform = "scale(105%)"
            })
            trash.addEventListener("mouseout", () => {
                trash.style.transform = "scale(100%)"
            })
            trash.addEventListener("click", event => {
                event.stopPropagation()
                let newSongsList = songs.slice(0, index).concat(songs.slice(index + 2, songs.length))

                newSongsList.forEach((elem, index) => {
                    if (index % 2 == 0)
                        newSongsList[index] = "{" + elem
                    else
                        newSongsList[index] = elem + "}"
                })
                newSongsList = newSongsList.join(", ").trim()

                if (newSongsList == "" || newSongsList == " " || newSongsList == ", ")
                    newSongsList = "none"
                if (newSongsList.charAt(newSongsList.length - 1) == ",")
                    newSongsList = newSongsList.slice(0, -1)
                
                window.localStorage.setItem(`${user}-lib`, newSongsList)
                song.remove()
                trash.remove()
                location.href = "libraryPage.html"
            })
            trash.addEventListener("mousedown", () => {
                trash.style.transform = "scale(105%)"
            })
            trash.addEventListener("mouseup", () => {
                trash.style.transform = "scale(100%)"
            })

            main.append(trash)
        }
    }
}