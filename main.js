const headerInitHeight = parseInt(
						window.getComputedStyle(
						document.querySelector("header"))
						.height
						)

const windowWidth_hwl = 750

window.addEventListener("resize", () => {
    const header = document.querySelector("header")
    const menuOptions = document.querySelector("#menu-options")
    const hBG = document.querySelector("#hBG")

	const headerWidth = parseInt(
						window.getComputedStyle(
						header)
						.width
						)
	const headerMinWidth = parseInt(
							window.getComputedStyle(
							header)
							.minWidth
							)

    if (headerWidth <= headerMinWidth) {
		header.style.minHeight = "300px"
		hBG.style.minHeight = parseInt(window.getComputedStyle(header).minHeight) + "px"

		const t = Math.max(0, (windowWidth_hwl - window.innerWidth) / 200)
		
		const temp = parseInt(window.getComputedStyle(header).height)
		header.style.height = "100vh"
		const _100vh2px = parseInt(window.getComputedStyle(header).height)
		header.style.height = temp

		console.log(t)

		header.style.height = lerp(headerInitHeight, _100vh2px, t) + "px"
		// menuOptions.style.alignSelf = "stretch"
		menuOptions.style.flexDirection = "column"
		hBG.style.height = parseInt(window.getComputedStyle(header).height) + "px"
    }
	else {
		// menuOptions.style.alignSelf = "inherit"
		menuOptions.style.flexDirection = "row"
		menuOptions.style.flex
		header.style.minHeight = headerInitHeight + "px"
		header.style.height = headerInitHeight + "px"
		hBG.style.minHeight = parseInt(window.getComputedStyle(header).minHeight) + "px"
		hBG.style.height = parseInt(window.getComputedStyle(header).height) + "px"
	}
})

function lerp(v0, v1, t) {
	return v0 + t * (v1 - v0)
}

