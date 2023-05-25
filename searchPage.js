window.onload = () => {
    const genresGrid = document.getElementById("genres")
    const threshold = 10

    // DEFAULT NUMBER OF COLUMNS
    genresGrid.style.gridTemplateColumns = `repeat(4, ${screen.availWidth / 4}px)`

    // CHANGE NUMBER OF COLUMNS BASED ON BROWSER WIDTH
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

    // PROCESS GENRE DIVS
    const genres = [...document.querySelectorAll(".genre")]
    genres.forEach((genre, index) => {
        genre.style.filter = `hue-rotate(${randInt(40, 300)}deg)`

        // GIVE GENRE RANDOM BACKGROUND COLORS
        const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "cyan", "magenta", "lime", "black", "white"]
        const color1 = colors[Math.min(randInt(0, colors.length), colors.length - 1)]
        const color2 = omit(colors, color1)[Math.min(randInt(0, colors.length - 1), colors.length - 2)]
        genre.style.background = `linear-gradient(${randInt(0, 360)}deg, ${color1}, ${color2})`
        
        // MAKE GENRE BACKGROUND CYCLE COLORS WHEN HOVERED
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



        // ADD LIST OF SONGS TO EVERY GENRE
        // FORMAT:
        //
        // *every <a href= *link*">*song-name*</a>
        //
        // *replaced with:
        //
        // <ul class="songs-list"></ul>
        //     <li>                             <--- song-1
        //         <button type="button"></button>
        //         <ul class="song-options">
        //             <li><button type="button" value="Play"></button></li>
        //             <li><button type="button" value="Add to Library"></button></li>
        //             <li><button type="button" value="Add to Favorites"></button></li>
        //         </ul>
        //     </li>
        //     .
        //     .
        //     .
        // </ul>
        //
        if (index < 9) {
            // CREATE LIST OF SONGS
            const songsList = document.createElement("ul")
            songsList.className = "songs-list"

            const songs = [...genre.getElementsByTagName("a")]
            const songsMap = songs.map(song => [song.innerHTML, song.href])
            songs.forEach((song, songIndex) => {
                // CREATE SONG ITEM
                const songListItem = document.createElement("li")

                // CREATE SONG BUTTON
                const songButton = document.createElement("button")
                songButton.type = "button"
                songButton.innerHTML = song.innerHTML
                songButton.className = "song-button"

                // CREATE SONG OPTIONS
                const songOptions = document.createElement("ul")
                songOptions.className = "song-options"

                // CREATE PLAY OPTION
                const optionPlay = document.createElement("li")
                const buttonPlay = document.createElement("button")
                buttonPlay.type = "button"
                buttonPlay.innerHTML = "Play"

                optionPlay.append(buttonPlay)

                // CREATE ADD TO LIBRARY OPTION
                const optionLib = document.createElement("li")
                const buttonLib = document.createElement("button")
                buttonLib.type = "button"
                buttonLib.innerHTML = "Add to Library"

                optionLib.append(buttonLib)

                // CREATE ADD TO FAVORITES OPTION
                const optionFav = document.createElement("li")
                const buttonFav = document.createElement("button")
                buttonFav.type = "button"
                buttonFav.innerHTML = "Add to Favorites"

                optionFav.append(buttonFav)

                // APPEND TO OPTIONS LIST
                songOptions.append(optionPlay, optionLib, optionFav)

                // APPEND TO SONG ITEM
                songListItem.append(songButton, songOptions)

                // STYLE OPTIONS LIST AFTER APPENDING (TO BE ABLE TO USE RELATIVE MEASUREMENTS)
                songOptions.style.position = "relative";
                songOptions.style.zIndex = "14";

                songOptions.style.top = "50px";
                songOptions.style.left = "50%";
                songOptions.style.transform = "translateX(-50%)";

                songOptions.style.width = "40%";
                songOptions.style.background = "linear-gradient(rgb(140, 140, 140), 80%, rgb(80, 80, 80))";
                songOptions.style.borderRadius = "12px";

                songOptions.style.listStyle = "none"

                // STYLE OPTION BUTTONS
                const optButt = [...songOptions.getElementsByTagName("button")]
                optButt.forEach(button => {
                    button.style.position = "relative"

                    button.style.left = "50%"
                    button.style.transform = "translateX(-50%)"

                    button.style.width = "95%"
                    button.style.height = "24px"

                    button.style.background = "linear-gradient(transparent, 80%, rgb(200, 200, 200))"
                    button.style.borderRadius = "12px"
                    button.style.zIndex = "15"

                    button.style.fontFamily = 'Rajdhani'
                    button.style.fontSize = "18px"
                    button.style.fontWeight = "500"

                    button.style.color = "white"

                    button.style.cursor = "pointer"
                })

                // APPEND TO SONG LIST
                songsList.append(songListItem)

                // STYLE SONG BUTTON
                songButton.style.position = "absolute"

                songButton.style.left = "50%"
                songButton.style.transform = "translateX(-50%)"

                songButton.style.width = "95%"
                songButton.style.height = `${100 / songs.length}%`

                songButton.style.background = "rgb(40, 40, 40)"
                songButton.style.zIndex = "11"

                if(songIndex == 0) {
                    songButton.style.borderTopLeftRadius = "24px"
                    songButton.style.borderTopRightRadius = "24px"
                }
                else if(songIndex == songs.length - 1) {
                    songButton.style.borderBottomLeftRadius = "24px"
                    songButton.style.borderBottomRightRadius = "24px"
                }

                songButton.style.fontFamily = 'Rajdhani'
                songButton.style.fontSize = "20px"
                songButton.style.fontWeight = "500"

                songButton.style.color = "white"

                songButton.style.cursor = "pointer"

                // REMOVE ANCHOR ELEMENT
                song.remove()
            })
            // APPEND SONG LIST TO GENRE
            genre.append(songsList)

            // STYLE SONG LIST AFTER APPENDING (TO BE ABLE TO USE RELATIVE MEASUREMENTS)
            songsList.style.position = "absolute"
            songsList.style.zIndex = "10";

            songsList.style.top = "70%";
            songsList.style.left = "70%";
            songsList.style.transform = "translateX(-50%)";

            songsList.style.width = "80%";
            songsList.style.backgroundColor = "rgb(51, 51, 51)";
            songsList.style.borderRadius = "24px";

            songsList.style.listStyle = "none"

            // CRETE NEW ELEMENT THAT WILL COPY SONG LIST'S ATTRIBUTES, BUT WILL STAY OUTSIDE GENRE
            const unwrappedSongsList = document.createElement("ul")

            // COPY SONG LIST'S ATTRIBUTES TO THE NEW ELEMENT
            Array.from(songsList.attributes).map(a => { unwrappedSongsList.setAttribute(a.name, a.value) })
            // COPY THE PROCESSED ATTRIBUTES
            unwrappedSongsList.style.top = getComputedStyle(songsList).top
            unwrappedSongsList.style.left = getComputedStyle(songsList).left
            unwrappedSongsList.style.width = getComputedStyle(songsList).width

            // COPY SONG LIST'S CHILDREN
            Array.from(songsList.children).forEach(child => unwrappedSongsList.appendChild(child.cloneNode(true)));

            // REMOVE THE ORIGINAL SONG LIST
            songsList.remove()

            // APPEND THE NEW SONG LIST
            genresGrid.append(unwrappedSongsList)

            // STYLE SONG BUTTONS ON MOUSE HOVER AND PRESS
            const songButtons = [...unwrappedSongsList.getElementsByClassName("song-button")]
            const optionLists = [...unwrappedSongsList.getElementsByClassName("song-options")]
            optionLists.forEach(ol => {
                ol.style.opacity = "0"
                ol.style.pointerEvents = "none"
            })
            songButtons.forEach((sb, sbIndex) => {
                sb.addEventListener("mouseover", () => {
                    sb.style.background = "rgb(50, 50, 50)"
                })
                sb.addEventListener("mouseout", () => {
                    sb.style.background = "rgb(40, 40, 40)"
                })
                sb.addEventListener("click", event => {
                    // SHOW OPTION LIST WHEN SONG IS CLICKED
                    event.stopPropagation()

                    optionLists.forEach(ol => {
                        ol.style.opacity = "0"
                        ol.style.pointerEvents = "none"
                    })

                    optionLists[sbIndex].style.opacity = ""
                    optionLists[sbIndex].style.pointerEvents = ""
                })
                sb.addEventListener("mousedown", () => {
                    sb.style.background = "rgb(30, 30, 30)"
                })
                sb.addEventListener("mouseup", () => {
                    sb.style.background = "rgb(40, 40, 40)"
                })
            })

            // SHOW SONG LIST WHEN GENRE IS CLICKED
            unwrappedSongsList.style.display = "none"
            genre.addEventListener("click", event => {
                event.stopPropagation()

                const allSongsLists = [...genresGrid.getElementsByClassName("songs-list")]
                allSongsLists.forEach(songList => {
                    songList.style.display = "none"
                })
                optionLists.forEach(ol => {
                    ol.style.opacity = "0"
                    ol.style.pointerEvents = "none"
                })

                const mouseX = event.pageX
                const mouseY = event.pageY
                const docWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
                const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                const bottomOfScreen = window.pageYOffset + window.innerHeight;

                unwrappedSongsList.style.display = ""
                unwrappedSongsList.style.top = `${mouseY}px`
                unwrappedSongsList.style.left = `${mouseX}px`
                
                const limLeft = mouseX - parseFloat(getComputedStyle(unwrappedSongsList).width.slice(0, -2))
                const limRight = mouseX + parseFloat(getComputedStyle(unwrappedSongsList).width.slice(0, -2))
                const limUp = mouseY - parseFloat(getComputedStyle(unwrappedSongsList).height.slice(0, -2))
                const limDown = mouseY + parseFloat(getComputedStyle(unwrappedSongsList).height.slice(0, -2))

                let transf = ""
                if(limRight > docWidth) {
                    if (limLeft < 0) {
                        if (Math.abs(mouseX - limRight) > Math.abs(mouseX - limLeft))
                            transf += "translateX(0%)"
                        else
                            transf += "translateX(-100%)"
                    }
                    else
                        transf += "translateX(-100%)"
                }
                else if (limLeft < 0) {
                    if (limRight > docWidth) {
                        if (Math.abs(mouseX - limRight) > Math.abs(mouseX - limLeft))
                            transf += "translateX(0%)"
                        else
                            transf += "translateX(-100%)"
                    }
                    else
                        transf += "translateX(0%)"
                }
                if(limDown > bottomOfScreen) {
                    if (limUp < 0) {
                        if (Math.abs(mouseY - limDown) > Math.abs(mouseY - limUp))
                            transf += " translateY(0%)"
                        else
                            transf += " translateY(-100%)"
                    }
                    else
                        transf += " translateY(-100%)"
                }
                else if (limUp < 0) {
                    if (limDown > bottomOfScreen) {
                        if (Math.abs(mouseY - limDown) > Math.abs(mouseY - limUp))
                            transf += " translateY(0%)"
                        else
                            transf += " translateY(-100%)"
                    }
                    else
                        transf += " translateY(0%)"
                }
                unwrappedSongsList.style.transform = transf
            })

            // STYLE OPTION BUTTONS ON MOUSE HOVER AND PRESS
            const optionButtons = [...unwrappedSongsList.getElementsByClassName("song-options")].map(so => [...so.getElementsByTagName("button")]).flat(1)
            optionButtons.forEach((ob, obIndex) => {
                ob.addEventListener("mouseover", () => {
                    ob.style.background = "linear-gradient(rgb(100, 100, 100), 60%, rgb(180, 180, 180))"
                })
                ob.addEventListener("mouseout", () => {
                    ob.style.background = "linear-gradient(transparent, 80%, rgb(200, 200, 200))"
                })
                if (obIndex % 3 == 0) {
                    ob.addEventListener("click", event => {
                        event.stopPropagation()
                        const _song = songsMap[Math.floor(obIndex / 3)]
                        location.href = _song[1]
                    })
                }
                else if (obIndex % 3 == 1) {
                    ob.addEventListener("click", event => {
                        event.stopPropagation()
                        const _song = songsMap[Math.floor(obIndex / 3)]
                        const user = window.localStorage.getItem("LoggedInAs")
                        if (user && user != "none") {
                            const lib = window.localStorage.getItem(`${user}-lib`)
                            let songInLib = false

                            if (lib != null) {
                                if (lib == "" || lib == "none")
                                    window.localStorage.setItem(`${user}-lib`, `{${_song[0]}, ${_song[1]}}`)
                                else {
                                    if (lib.search(_song[0]) < 0)
                                        window.localStorage.setItem(`${user}-lib`, `${lib}, {${_song[0]}, ${_song[1]}}`)
                                    else
                                        songInLib = true
                                }
                            }
                            else
                                window.localStorage.setItem(`${user}-lib`, `{${_song[0]}, ${_song[1]}}`)
                            
                            if (songInLib == true)
                                window.alert(`"${_song[0]}" is already in your library`)
                            else
                                window.alert(`"${_song[0]}" was added to your library`)
                        }
                        else
                            window.alert("You need to be logged in to add songs to your library")
                    })
                }
                else {
                    ob.addEventListener("click", event => {
                        event.stopPropagation()
                        const _song = songsMap[Math.floor(obIndex / 3)]
                        const user = window.localStorage.getItem("LoggedInAs")
                        if (user && user != "none") {
                            const favs = window.localStorage.getItem(`${user}-favs`)
                            let songInFavs = false

                            if (favs != null) {
                                if (favs == "" || favs == "none")
                                    window.localStorage.setItem(`${user}-favs`, `{${_song[0]}, ${_song[1]}}`)
                                else {
                                    if (favs.search(_song[0]) < 0)
                                        window.localStorage.setItem(`${user}-favs`, `${favs}, {${_song[0]}, ${_song[1]}}`)
                                    else
                                        songInFavs = true
                                }
                            }
                            else
                                window.localStorage.setItem(`${user}-favs`, `{${_song[0]}, ${_song[1]}}`)
                            
                            if (songInFavs == true)
                                window.alert(`"${_song[0]}" is already in your favorites`)
                            else
                                window.alert(`"${_song[0]}" was added to your favorites`)
                        }
                        else
                            window.alert("You need to be logged in to add songs to your favorites")
                    })
                }
                ob.addEventListener("mousedown", () => {
                    ob.style.background = "linear-gradient(rgb(60, 60, 60), 30%, rgb(120, 120, 120))"
                })
                ob.addEventListener("mouseup", () => {
                    ob.style.background = "linear-gradient(transparent, 80%, rgb(200, 200, 200))"
                })
            })

            // HIDE SONG LIST WHEN CLICKING OUTSIDE GENRE
            document.addEventListener("click", () => {
                unwrappedSongsList.style.display = "none"
                optionLists.forEach(ol => {
                    ol.style.opacity = "0"
                    ol.style.pointerEvents = "none"
                })
            })
        }
        else
            genre.addEventListener("click", () => {
                location.href = "https://youtu.be/xvFZjo5PgG0"
            })
    })

    // SEARCH BY CLICKING THE SEARCH BUTTON
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

    // SEARCH BY PRESSING ENTER
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

    // SEARCH BUTTON PRESSED STYLE
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