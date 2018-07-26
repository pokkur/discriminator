const BlackOrWhite = (hex) => {
    let r = parseInt(hex.substr(1, 2), 16)
    let g = parseInt(hex.substr(3, 2), 16)
    let b = parseInt(hex.substr(5, 2), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? 'white' : 'black'
}

document.addEventListener('DOMContentLoaded', () => {
    const Box = document.querySelector('#color')
    const ColorInput = document.querySelector('#color input')

    chrome.storage.local.get(null, function(result) {
        // console.log(`Load ${result.colorSource}`)

        let themeColor = (result.colorSource != undefined)
            ? result.colorSource
            : ColorInput.value

        {
            document.body.style.background = `#${themeColor}`
            ColorInput.value = themeColor
            Box.style.color = ColorInput.style.color = BlackOrWhite(themeColor)
        }

        ColorInput.addEventListener('input', (event) => {
            themeColor = event.currentTarget.value
            Box.classList.remove(`is-done`)

            if(themeColor.length >= 6) {
                chrome.storage.local.set({
                    colorSource: themeColor
                }, function() {
                    console.log(`Save a ${themeColor}`)
                })

                document.body.style.background = `#${themeColor}`
                Box.style.color = ColorInput.style.color = BlackOrWhite(themeColor)
                Box.classList.add(`is-done`)
                chrome.tabs.reload()
            }
        }, {
            capture: false
        })
    })
})