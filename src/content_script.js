'use strict'
if (/github/.test(window.location.host) && window.location.host != `github.com`) {
    chrome.storage.local.get(null, function(result) {
        let themeColor = (result.colorSource != undefined)
            ? result.colorSource
            : `#ff5a00`

        document.querySelector(`header.Header`).style.background = `#${themeColor}`
        if (document.querySelector(`header.Header .header-search-scope`)) {
            document.querySelector(`header.Header .header-search-scope`).style.borderRightColor = `#${themeColor}`
        }

        SetFavicon(`#${themeColor}`)
    })

    const SetFavicon = (_) => {
        if(!document.querySelector(`.js-site-favicon`)) {
            return false
        }

        const Canvas = document.createElement(`canvas`)
        document.body.appendChild(Canvas)
        Canvas.style.display = `none`
        const Ctx = Canvas.getContext(`2d`)

        Canvas.width = 16
        Canvas.height = 16

        let favicolor = _
        Ctx.fillStyle = favicolor
        Ctx.fillRect(0, 0, 16, 16)

        const Icon = new Image()
        let imageSrc = chrome.runtime.getURL(`favicon.png`)
        Icon.onload = function() {
            Ctx.globalCompositeOperation = `destination-in`
            Ctx.drawImage(Icon, 0, 0, 16, 16)
            Bury()
        }
        Icon.crossOrigin = `anonymous`
        Icon.src = imageSrc

        const Bury = () => {
            const favipath = Canvas.toDataURL()
            const Favicon = document.querySelector(`.js-site-favicon`)
            Favicon.setAttribute(`href`, favipath)
        }
    }
}
